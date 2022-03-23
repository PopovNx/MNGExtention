export const MangaLib = {
    NextPage(){
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
    PrevPage(){
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
    BlockMouse(){
      const ctx=   document.getElementsByClassName("reader-view")[0];
        ctx.style.pointerEvents = "none";
    },
    UnlockMouse(){
        const ctx=   document.getElementsByClassName("reader-view")[0];
        ctx.style.pointerEvents = "all";
    },
    SetPathName(path,href){
        if(location.pathname!==path){
            location.href = href;
        }
    },
    get MyPage(){
        if(location.search.split("=").length!==2){
            return 1;
        }        
        return parseInt(location.search.split("=")[1]);
    },
    GoToPage(page){
       while (page>this.MyPage)
           this.NextPage();
        while (page<this.MyPage)
            this.PrevPage();
    }
}