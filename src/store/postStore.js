import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
    state: () => ({
    posts: [
            { id: 1, title: "첫번째 게시물", content: "Vue.js로 만든 게시판입니다." },
        ],
        nextId: 2,
    }),
    actions: {
        addPosts(title, content) {
            this.posts.push({ id: this.nextId++, title, content });
        },
        getPostbyId(id) {
            return this.posts.find(post => post.id === Number(id));
        },
        deletePost(id) {
            this.posts = this.posts.filter(post => post.id !== Number(id));
        },
    },
});
