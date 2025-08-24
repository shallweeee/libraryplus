# 도서관<sup>+</sup>

사람과 도서관을 이어주고, 도서관에 가치를 더해주는 서비스

## Getting Started

### Installation

Install the dependencies and the pre-commit hook:

```bash
make setup
```

### Development

Start the development server with HMR:

```bash
make
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json
└── build/
    ├── client/    # Static assets
    └── server/    # Server-side code
```

---

Built with ❤️ using React Router.

## Utils

.git/hooks/pre-commit
```pre-commit
#!/bin/sh
TARGETS=$(git diff --cached --name-only --diff-filter=ACM | grep -E '^app/.*\.(ts|tsx|js|jsx|json|css|md|mdx)$')
if ! [ -z "$TARGETS" ]; then
  echo "$TARGETS" | xargs npx prettier --write || exit 1
  echo "$TARGETS" | xargs git add
fi
```
