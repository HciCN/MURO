@echo off
:: 设置字符集为UTF-8，防止中文乱码
chcp 65001 >nul
title 个人网站 GitHub 自动同步工具

echo ============================================================
echo         慕容子诚个人网站 - GitHub 一键同步工具
echo ============================================================
echo.

:: 1. 检查是否存在 .git 目录
if not exist .git (
    echo [❌ 错误] 当前目录未检测到 .git 文件夹，请确保在正确的项目根目录下运行。
    echo.
    pause
    exit /b
)

:: 2. 检查是否有文件改动
git status --porcelain | findstr /R "." >nul
if errorlevel 1 (
    echo [ℹ️ 提示] 未检测到任何本地文件改动。
    echo.
    choice /M "是否强制执行一次代码推送(git push)？"
    if errorlevel 2 goto end
    if errorlevel 1 goto push_only
)

:: 3. 展示当前改动的文件
echo [当前待同步的改动清单]：
git status -s
echo.

:: 4. 执行添加与提交
echo [1/3] 正在暂存所有文件 (git add .)...
git add .
echo.

echo [2/3] 正在提交本地修改 (git commit)...
set /p commit_msg="请输入本次修改的描述（直接回车默认使用 '更新网站信息'）: "
if "%commit_msg%"=="" set commit_msg=更新网站信息

git commit -m "%commit_msg%"
echo.

:push_only
:: 5. 执行推送
echo [3/3] 正在推送到 GitHub 远程仓库 (git push origin main)...
git push origin main

if errorlevel 1 (
    echo.
    echo [❌ 失败] 代码同步失败！
    echo 请检查以下可能的原因：
    echo 1. 网络连接是否正常（尤其是 GitHub 访问是否通畅）。
    echo 2. 您是否拥有该 GitHub 仓库的推送权限。
    echo 3. 远程仓库是否有他人提交，需要先执行 git pull 解决冲突。
    echo.
) else (
    echo.
    echo [✔️ 成功] 网站信息已成功同步到 GitHub 仓库！
    echo 如果您配置了 GitHub Pages，网站可能在 1-2 分钟内完成自动更新。
    echo.
)

:end
echo 同步操作已结束。
pause
