import {Component, OnInit} from '@angular/core';
import {Todo} from '../../models/Todo';
import {TodoService} from '../../services/todo.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todos = this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id); // UI Remove
    this.todoService.deleteTodo(todo).subscribe(); // Server Remove
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(_todo => {
      this.todos.push(_todo);
    });
  }
}
