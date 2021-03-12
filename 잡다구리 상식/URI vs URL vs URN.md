# URI vs URL v URN



### URI(Uniform Resource Identifier) 

URI는 인터넷의 우편물 주소 같은 것으로, 정보 리소스를 고유하게 식별하고 위치를 지정할  있다. 

이 URI에는 두가지 형태가 있는데 이것이 바로 URL, URN이다!



### URL(Uniform Resource Locator) 

URL은 특정 서버의 한 리소스에 대한 구체적인 위리를 서술한다.

URL은 리소스가 정확히 어디에 있고 어떻게 접근할 수 있는지 분명히 알려준다.

예를 들자면 아래와 같다. 

* http://naver.com
* http://img.naver.net.static/www/dl_qr_naver,png



### URN(Uniform Resource Name)

URN은 콘텐츠를 이루는 한 리소스에 대해, 그 리소스의 위치에 영향 받지 않은 유일무이한 이름 역할을 한다.

이 위치 독리적인 URN은 리소스를 여기저기로 옮기더라도 문제없이 동작한다.

예를 들어, 다음의 URN은 인터넷 표준 문서 'RFC 2141' 가 어디에 있거나 상관없이 그것을 지칭하기 위해 사용할 수 있다.

* Urn:ietf:rfc:2141



URN은 아직 채택되지 않아, 접할 기회가 없었을 것이다.

URN은 URL의 한계로 인해 착수되었다.



#### URL의 한계

URL은 주소이지 실제 이름이 아니다.

이 뜻은 특정 시점에 어떤 것이 위치한 곳을 알려준다는 것이다.



예를 들어, http://test.com/19 라는 링크가 있다.

주소를 바꾸고 싶어 http://test/test/com/19로 URL을 바꾸었다.

다른 사람이 노출된 검색 콘텐츠에 접근 시 노출된 페이지는 찾을 수 없게 된다.

이러한 단점으로 리소스가 옮겨지면 URL을 더는 사용할 수 없다는 것이다.



#### 결론

URL과 URN은 URI의 종류이다.

그렇기에 모든 URL은 URI이고, 또한 모든 URN은 URI이다.

그리고 URL과 URN은 다르다.

그렇다고 모든 URI는 URL이라고 말할 수 없다.





