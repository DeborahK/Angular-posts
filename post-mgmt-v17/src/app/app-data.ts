import { InMemoryDbService } from 'angular-in-memory-web-api';
import { PostCategory } from './post-categories/post-category';
import { PostCategoryData } from './post-categories/post-category-data';
import { Post } from './posts/post';
import { PostData } from './posts/post-data';
import { User } from './users/user';
import { UserData } from './users/user-data';

export class AppData implements InMemoryDbService {

  createDb(): { users: User[], posts: Post[], postCategories: PostCategory[]} {
    const users = UserData.Users;
    const posts = PostData.Posts;
    const postCategories = PostCategoryData.PostCategories;
    return { users, posts, postCategories };
  }
}
