import { fireEvent, render, screen, type Matcher } from '@testing-library/react'
import App from '../src/App'
import { TodoPage } from './pages/Todo.page';

describe('App Component', () => {
  let todoPage: TodoPage;

  beforeEach( () => {
    render(<App />);
    todoPage = new TodoPage();
  })

  it('renders the heading "TypeScript Web & Mobile App"', () => {
    const heading = screen.getByRole('heading', { name: todoPage.title});
    expect(heading).toBeInTheDocument();
  })

  it('adds a todo', async () => {
    const item = 'Add a todo';
    await todoPage.addItem(item);
    expect(todoPage.getTodoItemsByText(item)).toHaveLength(1);
  })
  
  it('adds a duplicate todo', async () => {
    const item = 'Add a duplicate todo';
    await todoPage.addItem(item);
    await todoPage.addItem(item);
    expect(todoPage.getTodoItemsByText(item)).toHaveLength(2);
  })
  
  it('adds a unique todo', async () => {
    const item1 = 'Add a unique todo 1';
    const item2 = 'Add a unique todo 2';
    await todoPage.addItem(item1);
    await todoPage.addItem(item2);
    expect(todoPage.getTodoItemsByText(item1)).toHaveLength(1);
    expect(todoPage.getTodoItemsByText(item2)).toHaveLength(1);
  })
  
  it('deletes a todo', async () => {
    const item = 'Delete a todo';
    await todoPage.addItem(item);
    expect(todoPage.getTodoItemsByText(item)).toHaveLength(1);
    await todoPage.deleteItem((todoPage.getTodoItemsByText(item))[0]);
    expect(todoPage.getTodoItemsByText(item)).toHaveLength(0);
  })

  it('deletes a duplicate todo', async () => {
    const item = 'Delete a duplicate todo';
    await todoPage.addItem(item);
    await todoPage.addItem(item);
    expect(todoPage.getTodoItemsByText(item)).toHaveLength(2);
    await todoPage.deleteItem((todoPage.getTodoItemsByText(item))[0]);
    expect(todoPage.getTodoItemsByText(item)).toHaveLength(1);
  })
})