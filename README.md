# NestJS Apollo Federation example

This repository shows how to migrate from existing apollo server to NestJS using federation plugin

```gql
query getTotalPosts {
  totalPosts
}

query getTest {
  test (id: 1) {
    id,
    letter
  }
}
```