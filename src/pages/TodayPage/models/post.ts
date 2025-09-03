export interface Enclosure {
    url: string;
    length: string;
    type: string;
}

export interface Itunes {
    owner?: {
        name: string;
        email: string;
    };
    author?: string;
}

export interface Post {
    creator: string;
    title: string;
    link: string;
    pubDate: string;
    'content:encoded': string;
    'content:encodedSnippet': string;
    enclosure: Enclosure;
    'dc:creator': string;
    content: string;
    contentSnippet: string;
    guid: string;
    isoDate: string;
    itunes: Itunes;
}

export interface FeedImage {
    link: string;
    url: string;
    title: string;
}

export interface PaginationLinks {
    self: string;
}

export interface Feed {
    items: Post[];
    feedUrl: string;
    image: FeedImage;
    paginationLinks: PaginationLinks;
    title: string;
    description: string;
    webMaster: string;
    generator: string;
    link: string;
    language: string;
    copyright: string;
    lastBuildDate: string;
    itunes: Itunes;
}
