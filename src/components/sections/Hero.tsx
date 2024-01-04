import Card from '../ui/Card'
export default function Hero(){

    return (
    <div>
        <div className="grid grid-cols-5 gap-6 w-full bg-gray-800 px-16 py-8" >
        <Card src="https://picsum.photos/1920/1080" alt="image" name="NFT 1" price="0.01 ETH" width="120" height="120"/>
        <Card src="https://picsum.photos/1920/1080" alt="image" name="NFT 2" price="0.01 ETH" width="120" height="120"/>
        <Card src="https://picsum.photos/1920/1080" alt="image" name="NFT 3" price="0.01 ETH"  width="120" height="120"/>
        <Card src="https://picsum.photos/1920/1080" alt="image" name="NFT 4" price="0.01 ETH" width="120" height="120" />
        <Card src="https://picsum.photos/1920/1080" alt="image" name="NFT 5" price="0.01 ETH" width="120" height="120"/>
        <Card src="https://picsum.photos/1920/1080" alt="image" name="NFT 6" price="0.01 ETH" width="120" height="120"/>
        <Card src="https://picsum.photos/1920/1080" alt="image" name="NFT 7" price="0.01 ETH"  width="120" height="120"/>
        <Card src="https://picsum.photos/1920/1080" alt="image" name="NFT 8" price="0.01 ETH" width="120" height="120" />
        <Card src="https://picsum.photos/1920/1080" alt="image" name="NFT 9" price="0.01 ETH" width="120" height="120"/>
        </div>
    </div>
        )
}