# Meerkatgram Client

> Meerkatgram 이미지 커뮤니티의 Vue 3 클라이언트

## 주요 기능

- 회원가입, 로그인, 로그아웃과 로그인 상태 복구
- Access Token 만료 전 자동 재발급
- 인증 사용자·게스트 전용 라우트 제어
- 전체 게시글, 상세 게시글과 내 게시글 조회
- 이미지 업로드 후 게시글 작성
- 본인 게시글 삭제
- 사용자 이메일 변경
- 작성 게시글 수 실시간 반영

## 기술 스택

| 구분 | 기술 |
| --- | --- |
| UI | Vue 3, Composition API |
| 상태 | Pinia |
| 라우팅 | Vue Router 4 |
| HTTP | Axios |
| 인증 보조 | jwt-decode, Day.js |
| 개발 서버 | Vite |

## 실행 방법

### 요구 환경

- Node.js 20 이상 권장
- npm
- `http://localhost:8080`에서 실행 중인 [Meerkatgram Backend](https://github.com/jeon950523/msa4-meerkatgram)

```powershell
git clone https://github.com/jeon950523/msa4-meerkatgram-client-main.git
cd msa4-meerkatgram-client-main
npm ci
npm run dev
```

Vite 개발 서버는 `/api` 요청을 `http://localhost:8080`으로 프록시합니다. 브라우저에서 출력된 개발 서버 주소로 접속합니다.

### 빌드 확인

```powershell
npm run build
npm run preview
```

## 사용 방법

1. 회원가입 화면에서 프로필 이미지와 사용자 정보를 등록합니다.
2. 로그인하면 Access Token과 사용자 정보가 Pinia에 저장됩니다.
3. 게시글 작성 화면에서 이미지를 업로드한 뒤 내용을 입력합니다.
4. 전체 게시글에서 상세 화면으로 이동하거나 내 게시글만 확인합니다.
5. 본인이 작성한 게시글은 상세 화면에서 삭제할 수 있습니다.
6. 사용자 정보 화면에서 이메일을 변경합니다.
7. 새로고침 시 Refresh Token 쿠키로 인증 복구를 시도하며, 실패하면 로그인 화면으로 이동합니다.

## 인증 흐름

```text
로그인 → Access Token은 Pinia 메모리에 저장
→ Axios 요청 인터셉터가 Authorization 헤더 추가
→ 만료 5분 전 Refresh Token 쿠키로 재발급
→ 재발급 실패 시 인증 상태 초기화
```

## 커밋 이력

| 순서 | 커밋 | 이전 단계에서 변경한 내용 |
| ---: | --- | --- |
| 1 | `a79e53a` 첫 커밋 | Vue 화면, Router, Pinia Store와 API 연결의 초기 전체본을 등록했습니다. |
| 2 | `24b02a6` 폴더 위치 이동 | 기능 변경 없이 프로젝트 파일의 저장 위치를 정리했습니다. Git이 이동으로 인식해 삽입·삭제 수치는 0입니다. |
| 3 | `0cceb68` 작성·삭제 | 이미지 게시글 작성과 본인 게시글 삭제 흐름을 추가했습니다. |
| 4 | `1a6edf2` 이미지 정리 | 화면에서 사용하는 이미지 리소스의 위치와 파일을 조정했습니다. |
| 5 | `554cdf0` 내 글·이메일 | 내 게시글 목록과 사용자 이메일 변경 화면·Store를 추가했습니다. |
| 6 | `bfb2295` 게시글 수 반영 | 작성·삭제 직후 사용자 게시글 수를 Pinia 상태에서 즉시 증감하도록 변경했습니다. |
| 7 | `c7b3b59` 작성 기능 PR 병합 | 게시글 작성 브랜치의 변경을 기본 브랜치에 반영했습니다. |
| 8 | `5f3bb98` 개발 PR 병합 | 개발 브랜치의 최종 통합 결과를 반영했습니다. |

### 첫 번째 커밋에서 두 번째 커밋으로

첫 커밋의 기능을 바꾸지 않고 저장소 안의 폴더 위치를 이동했습니다. 실제 기능 확장은 세 번째 커밋의 게시글 작성·삭제부터 시작됩니다.

## 성능 개선 기록

게시글 작성·삭제 후 전체 사용자 정보를 다시 요청하지 않고 Pinia의 `countPosts`를 즉시 증감한 변경은 불필요한 화면 재조회 가능성을 줄였습니다. 다만 네트워크 요청 수와 렌더링 시간의 전후 측정값은 커밋에 없어 정량적인 개선율은 기록하지 않았습니다.

측정하려면 작성·삭제 30회에서 API 요청 수, 사용자 정보 갱신 시간과 Vue 렌더링 시간을 변경 전후로 비교해야 합니다.

## 연결 저장소

- Backend: [msa4-meerkatgram](https://github.com/jeon950523/msa4-meerkatgram)
- 통합 백엔드 스냅샷: [msa4-meerkatgram-master](https://github.com/jeon950523/msa4-meerkatgram-master)
