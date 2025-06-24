# Playwright course

### Run commands
```bash
npm install -D @playwright/test@latest
npx playwright install --with-deps
npx playwright --version

npx playwright test
npx playwright test --project=chromium
npx playwright test --project webkit --project firefox
npx playwright test --project=chromium --trace on
npx playwright test --project=chromium --debug
npx playwright test --project=chromium --headed
npx playwright test -g "has title"
npx playwright test --ui

npx playwright show-report
```

### Generate tests
```bash
npx playwright codegen http://localhost:4200/pages/forms/layouts
npx playwright codegen https://qa.sertifi.net/eugeneqa/
```

### Test application
Tests folder: ./tests
See repo: pw-practice-app
```bash
git clone https://github.com/bondar-artem/pw-practice-app.git
npm install --force
npm start
```
Base URL: http://localhost:4200/


### Playwright roles (for getByRole)
"alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem"