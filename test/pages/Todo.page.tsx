import { fireEvent, screen, within, type Matcher } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export class TodoPage {
    private _title: RegExp = /TypeScript Web \& Mobile App/i;

    constructor() {}

    public get title(): RegExp {
        return this._title;
    }

    public async addItem(item: String) {
      const todoInput = screen.getByPlaceholderText('Add a new todo...')
      const addButton = screen.getByRole('button', {name : /Add/i })
      fireEvent.change(todoInput, {target: {value: item}})
      await userEvent.click(addButton)
    }

    public async deleteItem(item: HTMLElement) {
        within(item).getByRole('button')?.click();
    }

    public getTodoItemsByText(value: Matcher): HTMLElement[] {
      return screen.queryAllByText(value).map((textElement) => {return (textElement.parentElement!)});
    }

    // public getAllTodoItems(): HTMLElement[] {
    //     return screen.queryAllByRole()
    // }
}