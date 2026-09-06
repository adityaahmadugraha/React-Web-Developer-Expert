# Forum Diskusi

Aplikasi forum diskusi berbasis React + Redux, dibangun untuk submission
"Belajar Fundamental Aplikasi Web dengan React" (Dicoding). Menggunakan
Dicoding Forum API (`https://forum-api.dicoding.dev/v1`).

## Menjalankan proyek

```bash
npm install
npm run dev       # mode pengembangan
npm run build     # build produksi ke folder dist/
npm run lint      # menjalankan ESLint
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
  App.jsx        Routing
  main.jsx       Bootstrap: Provider, BrowserRouter, StrictMode
```

## kriteria submission

**Fungsionalitas**

- Daftar & login akun -> `pages/RegisterPage.jsx`, `pages/LoginPage.jsx`
- Daftar thread + filter kategori (client-side) -> `pages/HomePage.jsx`
- Detail thread + komentar -> `pages/ThreadDetailPage.jsx`
- Buat thread & komentar (wajib login) -> `pages/NewThreadPage.jsx`,
  form komentar di `ThreadDetailPage`, dilindungi `RequireAuth`
- Loading indicator -> `components/LoadingBar.jsx` + slice `states/loading`

**Arsitektur**

- Data dari API hidup di Redux store; hanya form input yang mengelola
  state lokal sendiri (`useState` di halaman login/register/buat thread)
- Panggilan REST API hanya terjadi di dalam thunk (`states/*/thunk.js`),
  tidak pernah langsung di `useEffect`/lifecycle komponen
- UI (`components/`, `pages/`) terpisah dari state (`states/`)
- Komponen modular & reusable: `VoteButtons`, `Avatar`, `Input`,
  `ThreadItem`/`ThreadsList`, `CommentItem`/`CommentsList` dipakai ulang
  di beberapa halaman

**Bugs highlighting**

- ESLint (flat config, `eslint.config.js`) dengan `eslint-plugin-react`
  dan `eslint-plugin-react-hooks`, memakai konvensi bergaya Airbnb
  JavaScript Style Guide (2 spasi indentasi, single quotes, wajib
  semicolon, dsb). `npm run lint` bersih tanpa error/warning.
- React Strict Mode aktif di `main.jsx`.

## Fitur tambahan yang diimplementasikan

- Votes pada thread & komentar, dengan indikasi visual saat sudah
  di-vote dan penerapan optimistic update (state di-update duluan,
  baru dikonfirmasi ke API; rollback otomatis jika gagal).
- Leaderboard di `pages/LeaderboardsPage.jsx`.
- Filter kategori murni di sisi front-end (`states/threads/reducer.js`
  -> `setActiveCategory`), karena API tidak menyediakan endpoint filter.

## Catatan

Template `create-vite` terbaru menyertakan `oxlint`, bukan ESLint. Karena
kriteria submission secara eksplisit meminta ESLint, linter tersebut
diganti dengan ESLint v9 (flat config) yang dikonfigurasi manual di
`eslint.config.js`.
