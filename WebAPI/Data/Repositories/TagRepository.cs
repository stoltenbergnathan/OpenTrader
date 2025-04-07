using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data.Repositories;

public class TagRepository : ITagRepository
{
    private readonly OpenTraderDbContext _context;

    public TagRepository(OpenTraderDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Tag>> GetAllAsync()
    {
        return await _context.Tags.ToListAsync();
    }

    public async Task<Tag?> GetByNameAsync(string? name)
    {
        return await _context.Tags
            .Where(tag => tag.Name == name)
            .FirstOrDefaultAsync();
    }

    public async Task<Tag> AddAsync(Tag newTag)
    {
        var addedTag = await _context.Tags.AddAsync(newTag);
        await _context.SaveChangesAsync();
        return addedTag.Entity;
    }
    public async Task<Tag?> UpdateAsync(int id, Tag updatedTag)
    {
        var existingTag = await _context.Tags.FirstOrDefaultAsync(tag => tag.Id == id);
        if (existingTag == null)
        {
            return null;
        }

        _context.Entry(existingTag).CurrentValues.SetValues(updatedTag);
        await _context.SaveChangesAsync();
        return existingTag;
    }
    public async Task<Tag?> DeleteAsync(int id)
    {
        var tagToDelete = await _context.Tags.FirstOrDefaultAsync(tag => tag.Id == id);
        if (tagToDelete == null)
        {
            return null;
        }

        _context.Tags.Remove(tagToDelete);
        await _context.SaveChangesAsync();

        return tagToDelete;
    }

}
