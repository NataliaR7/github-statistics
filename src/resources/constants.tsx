export enum UserActivityType {
    PushEvent = "PushEvent",
    PullRequestEvent = "PullRequestEvent",
    CreateEvent = "CreateEvent",
    ForkEvent = "ForkEvent",
    IssuesEvent = "IssuesEvent",
    WatchEvent = "WatchEvent"
}
export enum RepoActivityType {
    PushEvent = "PushEvent",
    PullRequestEvent = "PullRequestEvent",
    PullRequestReviewEvent = "PullRequestReviewEvent",
    IssuesEvent = "IssuesEvent",
    // IssueCommentEvent="IssueCommentEvent"
}

export enum Mouth {
    "Jan" = 0,
    "Feb" = 1,
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
}

export enum PagePath {
    "Main" = "/main",
    "Repos" = "/repos",
    "Compare" = "/compare",
}

export const languageColors = new Map([
    ["JavaScript", "#F9DE59"],
    ["HTML", "#F98365"],
    ["TypeScript", "#A1DFFB"],
    ["C#", "#CDDA95"],
    ["CSS", "#D1A4FF"],
]);
