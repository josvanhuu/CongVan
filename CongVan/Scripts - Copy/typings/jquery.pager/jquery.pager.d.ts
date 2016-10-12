///<reference path="../jquery/jquery.d.ts" />

interface JQueryPagerOptions {
    pagenumber: number;
    pagecount: number;
    totalrecords: number;
    buttonClickCallback: (pageclickednumber: number) => void;
}

interface JQuery {   
    pager(options: JQueryPagerOptions);

    pagerNextBackOnly(options: JQueryPagerOptions);
}

declare module "pager" { }