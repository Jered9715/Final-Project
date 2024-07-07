using Final_Project.DAL;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Final_Project.Models;

namespace Final_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkVisitHistoryController : ControllerBase
    {
        private readonly ParkVisitHistoryRepository _parkVisitHistoryRepository;
        public ParkVisitHistoryController(ParkVisitHistoryRepository parkVisitHistoryRepository)
        {
            _parkVisitHistoryRepository = parkVisitHistoryRepository;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ParkVisitHistoryDto>>> GetParkVisitHistories()
        {
            var visit = await _parkVisitHistoryRepository.GetAllParkVisitHistoriesAsync();
            return Ok(visit);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ParkVisitHistoryDto>> GetParkVisitHistories(int id)
        {
            var visit = await _parkVisitHistoryRepository.GetParkVisitHistoryByIdAsync(id);
            if (visit == null)
            {
                return NotFound();
            }
            return Ok(visit);
        }
        [HttpPost]
        public async Task<ActionResult<ParkVisitHistoryDto>> PostParkVisitHistory(ParkVisitHistoryDto parkVisitHistoryDto)
        {
            var createdVisit = await _parkVisitHistoryRepository.AddParkVisitHistoryAsync(parkVisitHistoryDto);

            return CreatedAtAction(nameof(GetParkVisitHistories), new
            {
                id = createdVisit.ParkVisitId
            }, createdVisit);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParkVisitHistory(int id, ParkVisitHistoryDto parkVisitHistoryDto)
        {
            if (id != parkVisitHistoryDto.ParkVisitId)
            {
                return BadRequest();
            }
            var updated = await _parkVisitHistoryRepository.UpdateParkVisitHistoryAsync(parkVisitHistoryDto);
            if (!updated)
            {
                return NotFound();
            }
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParkVisitHistory(int id)
        {
            var deleted = await _parkVisitHistoryRepository.DeleteParkVisitHistoryAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}