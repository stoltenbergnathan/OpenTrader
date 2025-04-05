using WebAPI.Models;

namespace WebAPI.Services;

public interface ITagService
{
    Task<IEnumerable<Tag>> GetAllTagsAsync();
    Task<Tag?> GetByNameAsync(string name);
    Task<Tag> AddAsync(Tag newTag);
    Task<Tag?> UpdateAsync(int id, Tag updatedTag);
    Task<Tag?> DeleteAsync(int id);
}
