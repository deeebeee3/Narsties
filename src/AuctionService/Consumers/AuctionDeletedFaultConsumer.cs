using AutoMapper;
using Contracts;
using MassTransit;

namespace AuctionService;

public class AuctionDeletedFaultConsumer : IConsumer<Fault<AuctionDeleted>>
{
    private readonly IMapper _mapper;

    public AuctionDeletedFaultConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }
    public async Task Consume(ConsumeContext<Fault<AuctionDeleted>> context)
    {
        Console.WriteLine("--> Consuming faulty auction delete");

        var exception = context.Message.Exceptions.First();

        if (exception.ExceptionType == "System.ArgumentException")
        {
            await context.Publish(context.Message.Message);
        }
        else
        {
            Console.WriteLine("Not an argument exception - update error dashboard somewhere");
        }
    }
}
