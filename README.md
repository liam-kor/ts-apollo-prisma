# ts-apollo-prisma

설치 및 구동

1. 패키지 설치

    ```
    npm install
    ```
2. 프리즈마 클라이언트 생성

    ```
    npx prisma generate
    ```

3. 데이터베이스 설정

    - prisma/.env 파일 내 dabatase url 설정
    - 사용하는 db 타입에 따라 prisma/schema.prisma 내 datasource provider 설정

3. 서버 구동
    ```
    npm run dev
    ```