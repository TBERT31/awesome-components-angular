import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from 'src/app/core/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
    ]),
  ]
})
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCtrl!: FormControl;
  animationStates: {[key : number]: 'default' | 'active'} = {};

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control(
      '', 
      [Validators.required, 
      Validators.minLength(10),
      Validators.maxLength(255)]);
    
    for(let index in this.comments) {
      this.animationStates[index] = 'default';
    }
  }

  onLeaveComment(): void {
    if(this.commentCtrl.invalid) {
      return;
    }

    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
      id: maxId + 1,
      comment: this.commentCtrl.value,
      createdDate: new Date().toISOString(),
      userId: 1
    });
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  onListItemMouseEnter(index: number): void {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number): void {
    this.animationStates[index] = 'default';
  }

}
