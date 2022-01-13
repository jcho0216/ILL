# esbuild, swc, tsc, babel React/JSX 프로젝트로 비교해보기 (feat. 속도)

### Babel 
- 2014년 세바스찬 멕켄지에 의해서 시작됨
- 자바스크립트로 작성됨
- 속도에 중점을 둔 적 없는 가장 오래되고 가장 성숙한 Javascript 변환기
- babel은 JSX를 지원하지 않기 때문에 **@babel/preset-react**를 **babel.config.json**에 추가해줘야함

```
$ cat babel/babel.config.json
{
	"presets" : ["@babel/preset-react"]
}
``` 
프로젝트를 실행하기 위해서 우린 그냥 babel에 우리 프로젝트 디렉토리를 넘겨주면 된다

```
$ cat babel/run.sh

set -e

yarn babel $1 --out-dir build
```

### Typescript의 tsx
- 2012년 안더스 헬스버그에 의해서 개발된 언어(C# 맨듦)
- 타입스크립트로 작성됨

**세팅**

- tsc를 위해서 ```--allowJs```를 설정하고 ```--rootDir $dir```을 전달하여 입력 프로젝트의 디렉토리 구조를 유지하고 프로젝트의 모든 .jsx파일을 전달해야한다.

```
$ cat typescript/run.sh
#!/usr/bin/env bash

set -e

yarn tsc --outDir build --allowJs --rootDir $1 $(find $1 -name '*.jsx')
```


### SWC
- 2019년에 강동윤이라는 사람이 출시함 (Vercel 스폰서)
- Rust로 작성됨

**세팅**

- 기본 구성 없이는 작동하지 않는다.
- Javascript로 컴파일 중이고 JSX가 활성되어 있으며 출력이 commonjs (e.g ```module.exports, require('moduleX'))```이어야 한다.

```
$ cat swc/.swcrc
{
  "jsc":{
    "parser":{
      "jsx": true,
      "syntax": "ecmascript"
    }
  },
  "module":{
    "type":"commonjs"
  }
}
```

실행하기 위해서는 컴파일 할 모든 파일과 출력 디렉토리를 넘겨줘야한다.

```
$ cat swc/run.sh
#!/usr/bin/env bash

set -ex

yarn swc $(find $1 -name '*.jsx') -d build

```


# esbuild
- 2020년에 에반 왈라스라는 사람에 의해서 출시됨 (피그마 맹근사람)
- Go언어로 작성됨

**세팅**

esbuild는 별도의 구성이나 까다로운 플래그가 필요하지 않다!
캄파일 할 파일 목록과 출력 디렉토르만 전달하면 된다.

```
$ cat esbuild/run.sh
#!/usr/bin/env bash

set -ex

yarn esbuild --outdir=build $(find $1 -name '*.jsx')
```

# 결과

<img width="725" alt="large" src="https://user-images.githubusercontent.com/67269455/148898872-140a4156-8a41-4097-8a58-d5d05ed1a23f.png">

<img width="722" alt="medium" src="https://user-images.githubusercontent.com/67269455/148898904-97197e68-05e7-4cbc-8c42-ee179fcdfcc5.png">

<img width="723" alt="small" src="https://user-images.githubusercontent.com/67269455/148898915-200e6a02-d12b-4081-842c-69c221d56424.png">


### esbuild가 모든 case에서 가장 빠른 모습을 보인다.

**esbuild -> swr -> typescript, babel**

***프로젝트의 사이즈가 커질수록 typescript가 더 좋은 선능을 보인다***

<br />

### 결론 및 기타 문제점들

- SWC는 예의가 없다, 에러 메시지를 제대로 띄우지 않는다, 그래서 어디서 에러가 났는지를 알기가 어렵다.
- SWC는 타입체커 기능이 존재하지 않아서 Typescript 파일을 넣으면 단지 Javascript로 컴파일만 할 뿐 타입체팅을 수행하지 못한다 -> stc가 개발되는 중이지만 비공개 프로젝트임
- Babel은 겁나 느리다 그치만 근본있다.
- esbuild는 es5 이하 버전으로는 트랜스파일링을 지원하지 않는다.
- esbuild로 내 프로젝트를 구성해보고 싶어졌다.
