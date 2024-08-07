const ShowCard = ({show}) => {
    return (
        <div className="show-card">
            <div className="image">
                <img src={show.image_thumbnail_path} alt={show.name}/>
            </div>
            <div className="show-name">
                <h2>{show.name}</h2>
            </div>
        </div>

    )
}

export default ShowCard;