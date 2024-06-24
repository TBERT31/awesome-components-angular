import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post!: Post;
  @Output() postCommented = new EventEmitter<{comment:string, postId: number}>();

  tempUser = {
    firstName: 'Thomas',
    lastName: 'Berteau'
  };
  

  constructor() { }

  ngOnInit(): void {
  }

  onNewComment(comment: string): void {
    this.postCommented.emit({comment, postId: this.post.id});
  }

}
