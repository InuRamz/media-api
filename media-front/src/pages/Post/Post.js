import React, {useState, useEffect} from 'react'
import Toolbar from '../../components/Toolbar/Toolbar'
import './Post.css'
import Thematic from '../../components/Thematic/Thematic';
import { getPost } from '../../services/post';
import { getCategories } from '../../services/categoryService';
import { getUserPermissions } from '../../services/user';
import { getThematics, addThematic } from '../../services/thematicsService';

const Post = () => {
	const [listPost, setListPost] = useState([]);
	const [listThematics, setListThematics] = useState([]);
	const [categories, setCategories] = useState([]);
	const [userPermissions, setUserPermissions] = useState([]);
	const [thematicCategory, setThematicCategory] = useState("");
	const [thematicName, setThematicName] = useState("");
	const [thematicFront, setThematicFront] = useState(null);

	useEffect(() => {
    getPost().then(list => setListPost(list));
    getThematics().then(thems => setListThematics(thems));
    getCategories().then(thems => setCategories(thems));
    getUserPermissions().then(permissions => setUserPermissions(permissions));
  }, []);

	const renderThematics = () => {
		if(listThematics?.length){
			return listThematics.map((theme, index) => <Thematic key={`theme-${index}`} name={theme.name} front={theme.front}/>)

		} else {
			return <div className="empty-box">
				<h3>No existen tematicas para mostrar</h3>
			</div>
		}
	}

	const mapCategories = () => {
		return categories.map((cat, index) => 
			<option key={`cat-${index}`} value={cat._id}>{cat.name}</option>
		)
	}

	const saveThematic = async () => {
		try {
			const newThematic = await addThematic({name: thematicName, category: thematicCategory, file: thematicFront});
			setListThematics([...listThematics, newThematic]);

		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="post-full-size">
			<Toolbar></Toolbar>
			<div className="post-content">
				{renderThematics()}

				{userPermissions.includes("thematic-thematic-create") ? <div className='thematic-form'>
					<input type='text' placeholder='Nombre' value={thematicName} onChange={(e) => setThematicName(e.target.value)}/>
					<select value={thematicCategory} onChange={(e) => setThematicCategory(e.target.value)}>
						{mapCategories()}
					</select>
					<input type='file' accept="image/*" onChange={(e) => setThematicFront(e.target.files[0])}/>
					<button className='button' onClick={() => saveThematic()}>Guardar</button>
				</div> : null}
			</div>
		</div>
	)
}

export default Post