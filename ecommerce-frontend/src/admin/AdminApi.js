import { API } from "../config";

/**
 * Permet de créer une catégorie dans la bd
 */

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        mode: "cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })

        .then(reponse => reponse.json())
        .catch(err => {
            console.log(err)
        });
};

/**
 * Permet de créer un produit dans la bd
 */

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        mode: "cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })

        .then(reponse => reponse.json())
        .catch(err => {
            console.log(err)
        });
};


/**
 * Permet d'aller chercher les categories du backend
 * @returns response.json()
 */
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

/**
 * Permets de chercher tout les commandes
 *  à partir du backend.
 * @returns response.json()
 */
export const getCommandes = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

/***
 * Permets de chercher les états d'une commande à partir de la BD.
 */
export const getValeursEtat = (userId, token) => {
    return fetch(`${API}/order/valeurs-etat/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

/***
 * Permets de chercher les états d'une commande à partir de la BD.
 */
export const updateEtatCommande = (userId, token, commandeId, statut) => {
    return fetch(`${API}/order/${commandeId}/etat/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ statut, commandeId })

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

/* effectuer crud sur produtits
get tout les produits
get un produit precis
besoin de update un produit précis
besoin mettre a jour un produit précis

*/

// vas chercher tout les produits de la bd
export const getProduits = () => {
    return fetch(`${API}/products?limit=2000000000`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// Efface le produit desiré
export const effacerProduit = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// vas chercher un seul produit dans le backend
export const getSingleProduits = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// met à jour le produit desiré
export const updateProduit = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};