# BUILD OPTIMIZATION
문제점 : 빌드 파이프라인 처리 시간이 길다. (30s)

목표 : 빌드 시간을 최대한 줄일 수 있는 방법 찾기

현재 까지의 해결책
- 외부 의존성의 경우 script 태그를 이용하여 처리하도록 수정
    - 4분에서 30초대로 빌드 시간 단축
    - 문제 cdn이 죽은 경우 웹페이지에 문제 생김
    - 빌드 시간을 단축 할 수 있다면 외부 의존성 포함 상태로 처리하며 좋을 듯 하다.
- babel 사용으로 인해 이 이상 단축 불가로 보임 

## 현재상황
| Name	| Value |
|---|---|
|로컬 빌드시간 |	1분 |
|실제 빌드시간 |	4분 |
|번들링 툴	| Webpack |
|트랜스파일 툴 |	Babel |

## 대체 방법
1. Webpack을 Esbuild로 대체 

| Name|	Value|
|--|--|
|기대 효과|	매우 좋은 성능 (70% ~ 90%)|
|장점|	상대적으로 유명함(안전성, 손 쉬운 설치)|
|단점|	esbuild맞춰 마이그레이션이 요구됨|

2. Babel을 다른 도구로 대체

|Name|Value|
|--|--|
|기대 효과|매우 좋은 성능 (70% ~ 90%)|
|장점	|무거운 Babel대신에 가벼운 번들링 도구 사용|
|단점	|Babel을 대체할 도구를 찾기 어려움(안전성, 성능 등등), 마이그레이션 요구|

3. 기본 도구들을 유지 하면서 최적화

|Name	| Value|
|--|--|
|기대 효과	 | 미미한 성능 (20% ~ 40%)|
|장점|	Webpack, Babel의 설정만 바꿈으로 마이그레이션 불필요|
|단점|	Webpack, Babel자체의 한계점을 벗어날 수 없음|

<br />

## ***babel***을 ***esbuild***로 대체해보기
<br />

### ***esbuild*** 설치하기
- ***esbuild***와 ***esbuild-loader*** 설치하기

    ``` yarn add esbuild esbuild-loader ```  

    ``` npm i esbuild esbuild-loader ```

- 쉽게 ***config***를 설정해주고 ***overriding*** 하기 위해 ***craco***(Create React App Configuration Override) 라이브러리 사용

    ``` yarn add @craco/craco ```

    ``` npm i @craco/craco ```

<br />

### ***esbuild*** 성능 테스팅 
: 첫번째 실행은 캐싱(caching)이 되어있지 않은 상태이며 이후는 캐싱이 되어있는 상태이다.
<br />
: 평균 빌드시간의 소숫점은 소수 둘째자리까지로 반올림하였다.
횟수 | esbuild 로컬 빌드시간(s) | babel 로컬 빌드시간(s)
|--|--|--|
1 | 24.50 | 66.97
2 | 25.50 | 27.58
3 | 27.06 | 28.98
4 | 25.75 | 28.15 
5 | 24.95 | 25.25  
6 | 25.55 | 26.56 
7 | 25.51 | 25.92 
8 | 25.48 | 25.93 |
9 | 24.93 | 25.69 |
10 | 24.66 | 25.46 |
평균 | 25.39 | 30.65

: esbuild가 babel보다 높은 속도를 자랑한다.
<br />
: 번들링(bundling) 툴로는 기존 webpack을 사용하고 있어 esbuild의 로컬 빋드시간이 20초 이내로는 내려가지 않는 듯 하다.
<br />

<br/>

### ***babel에서 esbuild로 migration***하기
1. ***craco*** (Create React App Configuration Override) 라이브러리에서 제공하는 ***craco.config.js*** 파일을 생성한다. 
<br />

2. 필요 모듈들( ***addAfterLoader, removeLoaders, loaderByName, throwUnexpectedConfigErro***r 등)을 ***@craco/craco*** 폴더에서 import 한다.
<br />

3. ***webpack configuration*** 설정하기
    - ***getLoader*** 모듈을 이용하여 ***babel-loader*** 있는지 찾은 후에 ***removeLoaders*** 모듈을 통해 ***babel-loader*** 없애버리기
    - ***js, jsx, ts, tsx***에서 돌아가게 되는 ***esbuild-loader***를 추가하기
    - ***TerserPlugin***을 ***EsBuildMinifyer***로 변경
<br />

<br />
<details>
<summary>소스코드</summary>
<div markdown="1">

    const { getLoader, addAfterLoader, removeLoaders, loaderByName, throwUnexpectedConfigError } = require("@craco/craco");
    const { ESBuildMinifyPlugin } = require("esbuild-loader");

    const throwError = (message) =>
        throwUnexpectedConfigError({
            packageName: 'craco',
            githubRepo: 'gsoft-inc/craco',
            message,
            githubIssueQuery: 'webpack'
        });

    module.exports = {
        webpack: {
            configure: (webpackConfig, { paths }) => {
                //babel-loader 찾기
                const { hasFoundAny } = getLoader(webpackConfig, loaderByName('babel-loader'));
                if (!hasFoundAny) throwError('babel-loader가 없습니다.');

                addAfterLoader(webpackConfig, loaderByName("babel-loader"), {
                    test: /\.(js|jsx|ts|tsx)$/,
                    include: paths.appSrc,
                    loader: require.resolve('esbuild-loader'),
                    options: {
                        loader: `tsx`,
                        target: 'es2015'
                    },
                });

                //babel-loader 제거중
                const { hasRemovedAny: babelRemoved } = removeLoaders(webpackConfig, loaderByName('babel-loader'));
                if (!babelRemoved) throwError("삭제할 babel-loader가 없습니다.");

                //TerserPlugin을 EsBuildMinifyPlugin으로 변경'
                webpackConfig.optimization.minimizer = [
                    new ESBuildMinifyPlugin({
                        target: 'es2015'
                    })
                ];

                //webpack configuration 리턴
                return webpackConfig;
            },
        },
    }; 
</div>
</details>

<br />

### ***이슈들***
- ***svg*** 파일을 ***loader***로 읽는 과정에서 필요한 마땅한 ***plugin***을 찾지 못하여서 컴포넌트(예. ***ReactComponent as SVGIcon***) 형태로 되어있는 파일들을 ***img*** 태그안의 ***src={}*** 안에 넣는 형태로 변환하였음.
- ***eslint-plugin***으로 인한 에러가 많이 발생하여 프로젝트를 ***start, build*** 그리고 ***test***할 때 ***eslint-plugin***을 ***disable***하였음.
``` 
    scripts: {
        "start" : "DISABLE_ESLINT_PLUGIN=true craco start",
        "build" : "DISABLE_ESLINT_PLUGIN=true craco build"),
        "test" : "DISABLE_ESLINT_PLUGIN=true craco test"),
    }
```
- 기타 잔 에러들은 stack-overflow나 해외 블로그 자료들을 많이 참고하였음.

### ***결론***

- ***Transcompiler babel***을 ***esbuild***로 대체한 결과 캐쉬가 안되어있는 상황에서는 빌드 속도가 약 3배정도 빨라지는 것을 확인 할 수 있었다 ( 캐싱이 완료된 상태이면 빌드 속도가 비슷함 ). 
- 기존에 사용하던 ***bundling*** 툴인 ***webpack***을 계속 사용하여 일정 속도(약 20s) 이하로는 내려가지 않는 모습을 볼 수 있었다.
- 추후에는 ***bundling*** 툴도 ***esbuild***로 대체하여 ***esbuild***의 공식 홈페이지 피셜 ***100배*** 빠른 속도감을 느껴보고 싶다.