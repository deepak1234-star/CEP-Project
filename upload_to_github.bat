@echo off
title Push EcoSort AI to GitHub
echo ========================================================
echo        Pushing EcoSort AI to GitHub Repository
echo ========================================================
echo Remote: https://github.com/deepak1234-star/CEP-Project.git
echo.

git config --local http.sslbackend openssl
git push -u origin main --force

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo  SUCCESS: Your project has been uploaded to GitHub!
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo  Push failed.
    echo  If prompted for credentials:
    echo  - Choose "Sign in with your browser"
    echo  - Or paste a GitHub Personal Access Token (PAT)
    echo ========================================================
)

echo.
pause
