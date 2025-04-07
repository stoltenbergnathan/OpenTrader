using WebAPI.Models;

namespace WebAPI.Data.Repositories;

public interface ITagRepository
{
    Task<IEnumerable<Tag>> GetAllAsync();
    Task<Tag?> GetByNameAsync(string? name);
    Task<Tag> AddAsync(Tag newTag);
    Task<Tag?> UpdateAsync(int id, Tag updatedTag);
    Task<Tag?> DeleteAsync(int id);
}
