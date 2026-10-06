# 若失公寓 LOST Apartment｜你正經歷哪種「不知道」？

《若失公寓》畢業製作的前導互動測驗。回答幾個深夜裡的小問題，找到與你迷惘共振的租客房間。

- IG：[@lost.apt](https://www.instagram.com/lost.apt/)
- 技術：React 18 + Vite + Tailwind CSS 3，部署在 GitHub Pages

## 網站會自動更新

每次把修改推送（push）到 `main` 分支，GitHub 會自動重新打包並發布網站，大約 1–2 分鐘後生效。
進度可以在倉庫上方的 **Actions** 分頁看到：綠色勾勾 = 已上線，紅色叉叉 = 失敗（點進去看原因）。

## 常改的地方

所有內容都在 `src/LostApartmentQuiz.jsx`，用任何文字編輯器打開即可。

| 想改什麼 | 在檔案裡搜尋 |
| --- | --- |
| 募資平台網址（10/7 上線後填入） | `crowdfunding: ""` |
| 實體展覽名稱、日期、地點 | `const EVENT` |
| IG 連結 | `instagram:` |
| 五道題目與選項 | `const QUESTIONS` |
| 四位角色的名字、房間名、金句、獨白、Hashtag | `const CHARACTERS` |
| 結算頁最後的三行結語 | `const CLOSING_LINES` |
| 入住須知內容 | `const tips = [` |
| 改用正式配樂音檔 | `const AUDIO_FILES` |

募資網址填好後，「募資計畫 10/7 正式上線」會自動變成可點的按鈕，分享文字也會加上連結。

## 檔案結構

```
.github/workflows/deploy.yml   自動發布設定（不用動）
index.html                     網頁標題、分享預覽文字
public/                        網站小圖示
src/LostApartmentQuiz.jsx      測驗本體（內容都在這）
src/assets/lost-apartment/     主視覺圖片（WebP）
src/assets/fonts/              jf open 粉圓字型（SIL OFL 1.1）
```

## 想在自己電腦上預覽（選用）

需要先安裝 [Node.js](https://nodejs.org/)，然後在這個資料夾打開終端機：

```
npm install
npm run dev
```

## 授權

字型 jf open 粉圓 Huninn 依 SIL Open Font License 1.1 授權。主視覺素材版權屬若失公寓團隊所有。
