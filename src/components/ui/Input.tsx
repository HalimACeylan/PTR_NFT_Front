export default function Input(data:any, setData: any) {

    return (
        <div>
            <label>
                Name:
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({...data, name: e.target.value})}
                    placeholder="İsim"
                />
            </label>
            <label>
                Description:
                <textarea
                    value={data.description}
                    onChange={(e) => setData({...data, description: e.target.value})}
                    placeholder="Açıklama"
                ></textarea>
            </label>
            <label>
                Price in PTR:
                <input
                    type="number"
                    value={data.price}
                    onChange={(e) => setData({...data, price: e.target.value})}
                    placeholder="PTR"
                />
            </label>
        </div>

    )
}