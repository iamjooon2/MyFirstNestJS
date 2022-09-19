## NestJS Middlewares

Filter
- 필터는 오류 처리 미들웨어. 특정 오류 처리기를 사용할 경로와 각 경로 주변의 복잡성을 관리하는 방법을 알 수 있음

Guards
- 가드는 인증 미들웨어. 지정된 경로로 통과할 수 있는 사람과 허용되지 않는 사람을 서버에 알려준다

Interceptors
- 인터셉터는 응답 매핑 및 캐시 관리와 함계 요청 로깅과 같은 전후 미들웨어. 각 요청 전후에 이를 실행하는 기능이 아주 강력하고 유용함

## Modules
UUID 모듈
- unique 한 값을 주기 위한 것

NestJs에서는 @Body body를 이용해서 가지고온다
모든 request에서 보내온 값을 가지고 올 수 있음

#### DTO(data transfer object)
- 계층간 데이터 교환을 위한 객체
DB에서 데이터를 얻어 Service나 Controller로 보낼때 사용
Interface와 Class를 이용하여 정의할 수 있으나, NestJs에서는 클래스를 이용하는걸 추천함

## Codebase vs Environment Variables(환경 변수)
- Codebase : 일반적으로 Port같이 노출되어도 상관 없는 정보들
- 환경변수 : 비밀번호나 API Key 같은 노출되면 안되는 정보들
- config 모듈 사용 

현 프로젝트 config 파일 내 환경 분리 방법
default.yml : 기본 설정(개발 환경 설정이나 운영 환경 설정에도 적용됨)
development.yml : default.yml + 개발환경에서 필요한 정보
production.yml : default.yml + 운영환경에서 필요한 정보