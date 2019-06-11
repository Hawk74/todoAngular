import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Todo} from '../../models/Todo';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
@Input() todo: Todo;
@Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    };
    return classes;
  }

  onToggle(todo: Todo) {
    todo.completed = !todo.completed; // UI toggle
    this.todoService.toggleCompleted(todo).subscribe(); // Server toggle
  }

  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }
}
