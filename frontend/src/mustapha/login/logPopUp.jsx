

export default function LogPopUp({ popUpData }) {

    



    return ((<div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{popUpData.title}</h2>
        <p className="text-gray-600">{popUpData.message}</p>
    </div>))

}