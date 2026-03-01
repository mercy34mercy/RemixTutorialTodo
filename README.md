# Todo アプリ

React Router v7 + Prisma + PostgreSQL で構築したシンプルな Todo アプリです。

## 技術スタック

| カテゴリ | ライブラリ | バージョン |
|---|---|---|
| フレームワーク | [React Router v7](https://reactrouter.com/) | ^7.2.0 |
| UI | [React](https://react.dev/) | ^19.0.0 |
| スタイリング | [Tailwind CSS v4](https://tailwindcss.com/) | ^4.0.0 |
| フォームバリデーション | [@conform-to/react](https://conform.guide/) + [@conform-to/zod](https://conform.guide/api/zod) | ^1.17.1 |
| スキーマ定義 | [Zod](https://zod.dev/) | ^4.3.6 |
| ORM | [Prisma](https://www.prisma.io/) | ^6.4.1 |
| DB | PostgreSQL | 16 |
| ビルドツール | [Vite](https://vitejs.dev/) | ^6.2.0 |

## ディレクトリ構成

```
app/
├── front/
│   └── models/todo/
│       ├── CreateTodoForm.tsx   # conform によるフォーム + Zod スキーマ
│       ├── TodoList.tsx         # フィルタタブ + Todo 一覧
│       └── TodoDetail.tsx       # Todo 詳細 + TodoAction enum
│
├── server/
│   └── models/todo/presentation/
│       ├── createTodoAction.server.ts
│       ├── deleteTodoAction.server.ts
│       ├── toggleTodoAction.server.ts
│       ├── getTodoListLoader.server.ts
│       └── getTodoDetailLoader.server.ts
│
├── lib/
│   └── db.server.ts             # Prisma クライアント
│
└── routes/
    ├── home.tsx                 # / — Todo 一覧・作成
    └── todos.$id.tsx            # /todos/:id — Todo 詳細・操作
```

## 環境構築

### macOS

#### 前提条件

- Node.js 20 以上
- [OrbStack](https://orbstack.dev/)（Docker Desktop の代替。起動が速くメモリ消費が少ない）

#### 1. OrbStack のインストール

```bash
brew install orbstack
```

インストール後、OrbStack を起動するとメニューバーに常駐します。

#### 2. リポジトリのクローン・依存パッケージのインストール

```bash
git clone <repository-url>
cd RemixTutorialTodoApp
npm install
```

#### 3. 環境変数の設定

```bash
cp .env.example .env
```

#### 4. PostgreSQL の起動

```bash
docker compose up -d
```

---

### Windows

#### 前提条件

- Node.js 20 以上（[公式サイト](https://nodejs.org/)からインストーラーでインストール）
- [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
- WSL 2 が有効化されていること（Docker Desktop のインストール時に案内されます）

#### 1. Docker Desktop のインストール

1. [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) からインストーラーをダウンロード
2. インストーラーを実行し、**Use WSL 2 instead of Hyper-V** にチェックを入れてインストール
3. インストール後、PC を再起動
4. Docker Desktop を起動してタスクトレイに常駐していることを確認

#### 2. リポジトリのクローン・依存パッケージのインストール

PowerShell またはコマンドプロンプトで実行:

```powershell
git clone <repository-url>
cd RemixTutorialTodoApp
npm install
```

#### 3. 環境変数の設定

```powershell
copy .env.example .env
```

#### 4. PostgreSQL の起動

Docker Desktop が起動している状態で実行:

```powershell
docker compose up -d
```

---

### 共通手順（macOS / Windows）

#### 5. DB マイグレーション

```bash
npx prisma migrate deploy
```

初回セットアップ時や `schema.prisma` を変更した後は:

```bash
npx prisma migrate dev --name <migration-name>
```

#### 6. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:5173 でアクセスできます。

## 開発コマンド

```bash
# 開発サーバー起動（HMR あり）
npm run dev

# 型チェック
npm run typecheck

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# Prisma Studio（DB の GUI ブラウザ）
npx prisma studio

# Docker コンテナ停止
docker compose down

# Docker コンテナ停止 + ボリューム削除（DB をまっさらにリセット）
docker compose down -v
```
