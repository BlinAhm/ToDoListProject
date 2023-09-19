namespace ToDoList.Models
{
    public class TodoList
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime DueDate { get; set; }
        public List<Item> Items { get; set; }

        public TodoList()
        {
            Items = new List<Item>();
        }
    }
}
