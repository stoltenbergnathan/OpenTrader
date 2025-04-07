using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly ITagService _tagService;

        public TagsController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTags()
        {
            var tags = await _tagService.GetAllTagsAsync();
            return Ok(tags);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetTag(string name)
        {
            var tag = await _tagService.GetByNameAsync(name);
            return Ok(tag);
        }

        [HttpPost]
        public async Task<IActionResult> AddTag(Tag tag)
        {
            var tags = await _tagService.AddAsync(tag);
            return Ok(tags);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTag(int id, Tag tag)
        {
            var tags = await _tagService.UpdateAsync(id, tag);
            return Ok(tags);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveTag(int id)
        {
            var tags = await _tagService.DeleteAsync(id);
            return Ok(tags);
        }

        [HttpDelete("unused")]
        public async Task<IActionResult> RemoveUnusedTags()
        {
            var deletedTags = await _tagService.DeleteUnusedAsync();
            return Ok(deletedTags);
        }
    }
}
