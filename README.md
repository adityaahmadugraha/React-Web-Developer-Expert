# Forum Diskusi

Aplikasi forum diskusi berbasis React + Redux, dibangun untuk submission
"Menjadi React Web Developer Expert" (Dicoding). Menggunakan Dicoding Forum
API (`https://forum-api.dicoding.dev/v1`).

**Live demo:** https://react-web-developer-expert.vercel.app/

## Menjalankan proyek

```bash
npm install
npm run dev       # mode pengembangan
npm run build     # build produksi ke folder dist/
npm run lint      # menjalankan ESLint
npm test          # menjalankan unit & integration test (Vitest)
npm run e2e       # menjalankan end-to-end test (Playwright)
```

## Struktur folder

```
src/
  utils/         API layer (api.js) + util kecil (formatTime.js)
  states/        Redux: satu subfolder per domain, tiap domain punya
                 reducer.js (state shape) dan thunk.js (satu-satunya
                 tempat panggilan API terjadi)
  components/    UI reusable & "dumb" (tidak memanggil API secara langsung)
  pages/         Halaman yang menghubungkan UI ke Redux store
  test/          Setup file untuk Vitest
  App.jsx        Routing
  main.jsx       Bootstrap: Provider, BrowserRouter, StrictMode
e2e/             End-to-end test (Playwright)
.github/
  workflows/     Workflow CI (GitHub Actions)
```

## Kriteria submission

**Fungsionalitas**

- Daftar & login akun -> `pages/RegisterPage.jsx`, `pages/LoginPage.jsx`
- Daftar thread + filter kategori (client-side) -> `pages/HomePage.jsx`
- Detail thread + komentar -> `pages/ThreadDetailPage.jsx`
- Buat thread & komentar (wajib login) -> `pages/NewThreadPage.jsx`,
  form komentar di `ThreadDetailPage`, dilindungi `RequireAuth`
- Loading indicator -> `components/LoadingBar.jsx` + slice `states/loading`

**Arsitektur**

- Data dari API hidup di Redux store; hanya form input yang mengelola
  state lokal sendiri (`react-hook-form` di halaman login/register/buat thread)
- Panggilan REST API hanya terjadi di dalam thunk (`states/*/thunk.js`),
  tidak pernah langsung di `useEffect`/lifecycle komponen
- UI (`components/`, `pages/`) terpisah dari state (`states/`)
- Komponen modular & reusable: `VoteButtons`, `Avatar`, `FormField`,
  `ThreadItem`/`ThreadsList`, `CommentItem`/`CommentsList` dipakai ulang
  di beberapa halaman

**Bugs highlighting**

- ESLint (flat config, `eslint.config.js`) memakai konvensi Airbnb
  JavaScript Style Guide. `npm run lint` bersih tanpa error/warning.
- React Strict Mode aktif di `main.jsx`.

**Automation testing**

- Unit & integration test dengan Vitest + React Testing Library:
  - Reducer: `states/threads/reducer.test.js`,
    `states/threadDetail/reducer.test.js`
  - Thunk: `states/authUser/thunk.test.js`, `states/threads/thunk.test.js`
  - Component: `components/VoteButtons.test.jsx`, `pages/LoginPage.test.jsx`
- End-to-end test alur login dengan Playwright: `e2e/login.spec.js`

**Deployment (CI/CD)**

- Continuous Integration dengan GitHub Actions (`.github/workflows/ci.yml`):
  menjalankan lint, test, e2e, dan build di setiap push/PR ke `master`.
- Continuous Deployment ke Vercel: setiap push ke `master` otomatis
  men-deploy ulang aplikasi.
- Branch `master` diproteksi (wajib PR + status check CI lolos sebelum merge).

## React Ecosystem

Proyek ini memanfaatkan **React Hook Form** untuk mengelola form (login,
register, buat thread, dan komentar) beserta validasinya.

## Fitur tambahan

- Votes pada thread & komentar, dengan indikasi visual saat sudah di-vote
  dan penerapan optimistic update (state di-update duluan, baru dikonfirmasi
  ke API; rollback otomatis jika gagal).
- Leaderboard di `pages/LeaderboardsPage.jsx`.
- Filter kategori murni di sisi front-end (`states/threads/reducer.js`
  -> `setActiveCategory`), karena API tidak menyediakan endpoint filter.
