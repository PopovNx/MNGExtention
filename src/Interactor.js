export const MangaLib = {
    NextPage() {
        const ctx = document
            .getElementsByClassName("reader-view__wrap")[0]
            .children[0];
        const event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true,
            'clientX': 700,
            'clientY': 200
        });
        ctx.dispatchEvent(event);
    },
    PrevPage() {
        const ctx = document
            .getElementsByClassName("reader-view__wrap")[0]
            .children[0];
        const event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true,
            'clientX': 0,
            'clientY': 200
        });
        ctx.dispatchEvent(event);
    },
    BlockMouse() {
        const ctx = document.getElementsByClassName("reader-view")[0];
        ctx.style.pointerEvents = "none";
    },
    UnlockMouse() {
        const ctx = document.getElementsByClassName("reader-view")[0];
        ctx.style.pointerEvents = "all";
    },
    SetPathName(path, href) {
        if (location.pathname !== path) {
            location.href = href;
            console.log("Loading New Src");
            return false;
        }
        return true;
    },
    get MyPage() {
        const url = new URL(location.href);
        const paramValue = url.searchParams.get("page")||1;
        return parseInt(paramValue);
    },
    set PageNow(e) {
        console.log("page now",e)
        this._pageNow = e;
    },
    get PageNow() {
        return this._pageNow;
    },
    MoveToPage() {
        this.GoToPage(this.PageNow);
    },
    GoToPage(page) {
        console.log(page)
        if (page > this.MyPage) {
            console.log("Page Up");
            this.NextPage();
        }
        if (page < this.MyPage) {
            console.log("Page Down");
            this.PrevPage();
        }
    }
}