namespace ToDoList.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public bool IsComplete { get; set; }
        public int TodoList {  get; set; }
    }
}
