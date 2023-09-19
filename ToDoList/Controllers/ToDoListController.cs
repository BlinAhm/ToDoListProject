﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using ToDoList.Database;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoListController : ControllerBase
    {
        private readonly ToDoListContext _context;
        public ToDoListController(ToDoListContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetLists")]
        public List<TodoList> GetLists()
        {
            return _context.TodoLists.ToList();
        }

        [HttpGet]
        [Route("GetItems")]
        public List<Item> GetItems()
        {
            return _context.Items.ToList();
        }

        [HttpGet]
        [Route("GetItemsByList/{id}")]
        public List<Item> GetItemsByList(int id)
        {
            return _context.Items.Where(x=>x.TodoList.Id == id).ToList();
        }

        [HttpPost]
        [Route("AddList")]
        public void AddList([FromForm] TodoList todoList)
        {
            _context.TodoLists.Add(todoList);
            _context.SaveChanges();
        }

        [HttpPost]
        [Route("AddItem")]
        public void AddItem([FromForm] Item item)
        {
            item.TodoList = _context.TodoLists.Where(x => x.Id == item.TodoListId).FirstOrDefault();

            _context.Items.Add(item);
            _context.SaveChanges();
        }
    }
}