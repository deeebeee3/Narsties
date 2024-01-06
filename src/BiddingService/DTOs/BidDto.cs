namespace BiddingService;

public class BidDto
{
    public string Id { get; set; }
    public string AuctionId { get; set; }
    public string Bidder { get; set; }
    public DateTime BidTime { get; set; }
    public int Amount { get; set; }
    //public BidStatus BidStatus { get; set; }
    //return string value rather than enum integer
    public string BidStatus { get; set; }
}
