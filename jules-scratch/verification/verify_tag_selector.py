from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. 前往 TagSelector 展示頁面
        page.goto("http://localhost:5173/typescript-version/tag-selector-demo", wait_until="networkidle")
        page.pause()

        # 2. 等待頁面載入
        expect(page.get_by_role("heading", name="TagSelector Demo")).to_be_visible(timeout=10000)

        # 3. 找到 TagSelector
        tag_selector = page.locator(".tag-selector")
        expect(tag_selector).to_be_visible()

        # 4. 開啟下拉選單並選取一個標籤
        tag_selector.click()
        page.locator(".tag-list-item").filter(has_text="documentation").click()

        # 5. 開啟建立標籤的對話框 (在選單還開著時)
        page.get_by_role("button", name="建立專案標記 (label)").click()

        create_dialog_title = page.get_by_role("heading", name="建立標記 (label)")
        expect(create_dialog_title).to_be_visible()

        # 6. 輸入新標籤的資訊並建立
        page.get_by_placeholder("標籤名稱").fill("New Feature")
        page.get_by_role("button", name="建立", exact=True).click()

        # 7. 驗證新標籤已顯示為 chip
        expect(page.locator(".v-chip", has_text="New Feature")).to_be_visible()

        # 8. 截圖
        screenshot_path = "jules-scratch/verification/tag_selector_verification.png"
        page.locator(".tag-selector").screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

    except Exception as e:
        error_path = "jules-scratch/verification/error_screenshot.png"
        page.screenshot(path=error_path)
        print(f"An error occurred. Screenshot saved to {error_path}")
        raise e

    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as p:
        run_verification(p)