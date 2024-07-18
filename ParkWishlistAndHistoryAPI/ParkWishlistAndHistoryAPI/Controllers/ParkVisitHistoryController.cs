using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ParkWishlistAndHistoryAPI.DAL;
using ParkWishlistAndHistoryAPI.Models;

namespace ParkWishlistAndHistoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkVisitHistoryController : ControllerBase
    {
        private readonly ParkVisitHistoryRepository _repo;

        public ParkVisitHistoryController(ParkVisitHistoryRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllVisitHistory()
        {
            List<ParkVisitHistory>vistHistory = _repo.GetAllParkVisitHistory();
            return Ok(vistHistory);
        }

        [HttpGet("{id}")]
        public IActionResult GetVisitHistoryById(int id)
        {
            ParkVisitHistory parkVisit = _repo.GetParkVisitById(id);
            if (parkVisit != null)
            {
                return Ok(parkVisit);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult AddVisitHistory([FromBody] ParkVisitHistoryCreationDto visitDto)
        { 
            _repo.AddParkVisitToHistory(visitDto);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateVisitHistory(int id, [FromBody] ParkVisitHistoryUpdateDto visitDto)
        {
            ParkVisitHistory visit = _repo.GetParkVisitById(id);
            if (visit == null)
            {
                return NotFound();
            }
            visit.DateVisited = visitDto.DateVisited;
            visit.ParkNotes = visitDto.ParkNotes;
            _repo.UpdateParkVisit(visit);
            return NoContent();

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteVisitHistoryById(int id)
        {
            ParkVisitHistory visit = _repo.GetParkVisitById(id);
            if (visit == null)
            {
                return NotFound();
            }
            _repo.DeleteParkVisit(id);
            return NoContent();

        }

    }
}
