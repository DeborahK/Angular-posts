import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { PostCategory } from '../post-categories/post-category';
import { PostCategoryService } from '../post-categories/post-category.service';
import { PostService } from './post.service';

@Component({
  selector: 'pm-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  title = 'Posts by Category';

  // Needed for Typeahead open on focus and clear
  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  clear$ = new Subject<string>();

  categories$ = this.postCategoryService.allCategoriesSorted$;
  selectedCategory: PostCategory | undefined;

  postsForCategory$ = this.postService.postsForCategory$;

  // Formats the typeahead entry
  formatter = (category: PostCategory) => category.name;

  // Handles the typeahead
  search: OperatorFunction<string, readonly PostCategory[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));

    const operations$ = merge(debouncedText$, clicksWithClosedPopup$, this.focus$, this.clear$);

    return combineLatest([
      operations$,
      this.categories$
    ]).pipe(
      map(([text, categories]) =>
        text === '' ? categories : categories.filter(c => new RegExp(`^${text}`, 'i').test(c.name)))
    );
  }

  constructor(private postService: PostService,
              private postCategoryService: PostCategoryService) { }

  ngOnInit(): void {
  }

  categorySelected(category: PostCategory): void {
    this.postService.selectedCategoryChanged(category.id);
  }

  // Clear the category display
  // And display all of the posts
  onClear(): void {
    this.selectedCategory = undefined;
    this.clear$.next('');
    this.postService.selectedCategoryChanged(0);
  }

}
