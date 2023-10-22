# TestifAI
TestifAI is a study-enhancement application that optimizes learning efficiency by reading PDF-based study materials, including notes, presentation slides, and homework, and generating practice questions from them

## Installation
```bash
git clone https://github.com/DRobinson4105/TestifAI.git
cd TestifAI
pnpm install
python -m venv .venv
.venv/Scripts/activate
pip install -r src/requirements.txt
```

## Configuration
- Create a `.env` file in the project root directory with the following template
- Replace the api key placeholders with your [OpenAI](https://openai.com/blog/openai-api) and [Clerk](https://dashboard.clerk.dev/last-active?path=api-keys) API keys
- Set the port number for the flask server
```sh
OPENAI_API_KEY=openai_api_key

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=next_public_clerk_publishable_key
CLERK_SECRET_KEY=clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

port=port_number
```

## Usage
After installing TestifAI, you can run the production server with the following commands:

### Front-end Server
```bash
pnpm build
pnpm start
```
### Back-end Server
Make sure that the python virtual environment is running by executing the script (```.venv/Scripts/activate```)

```bash
python src/main.py
```

## Contributions
If you'd like to report a bug, request a feature, or contribute code, please submit an issue or pull request