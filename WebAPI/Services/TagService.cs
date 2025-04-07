using WebAPI.Data.Repositories;
using WebAPI.Models;

namespace WebAPI.Services;

public class TagService : ITagService
{
    private readonly ITagRepository _tagRepository;

    public TagService(ITagRepository tagRepository)
    {
        _tagRepository = tagRepository;
    }

    public async Task<IEnumerable<Tag>> GetAllTagsAsync()
    {
        return await _tagRepository.GetAllAsync();
    }

    public async Task<Tag?> GetByNameAsync(string name)
    {
        return await _tagRepository.GetByNameAsync(name);
    }

    public async Task<Tag> AddAsync(Tag newTag)
    {
        return await _tagRepository.AddAsync(newTag);
    }

    public async Task<Tag?> UpdateAsync(int id, Tag updatedTag)
    {
        return await _tagRepository.UpdateAsync(id, updatedTag);
    }

    public async Task<Tag?> DeleteAsync(int id)
    {
        return await _tagRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<Tag>> DeleteUnusedAsync()
    {
        var tags = await _tagRepository.GetAllAsync();

        List<Tag> deletedTags = [];
        foreach (var tag in tags)
        {
            if (tag.TradeEntries.Count == 0)
            {
                var deletedTag = await _tagRepository.DeleteAsync(tag.Id);
                deletedTags.Add(deletedTag);
            }
        }
        return deletedTags;
    }
}
