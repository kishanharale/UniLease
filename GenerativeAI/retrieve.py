# import psycopg2
# import numpy as np

# # Database connection details
# connection = psycopg2.connect(
#     host="localhost",
#     database="Unilease",
#     user="Nihar",
#     password="Unilease"
# )

# cursor = connection.cursor()

# def load_all_listings():
#     # Query to get all listing features
#     cursor.execute("SELECT id, name, address, features FROM ailistings")
#     listings = cursor.fetchall()
    
#     results = []
#     for listing in listings:
#         listing_id, name, address, features_blob = listing
#         # Convert the byte data back to a numpy array
#         features_array = np.frombuffer(features_blob, dtype=np.float32)
#         results.append((listing_id, name, address, features_array))
    
#     return results

# listings = load_all_listings()

# print("Retrieved listings:")
# for listing in listings:
#     print(f"ID: {listing[0]}, Name: {listing[1]}, Address: {listing[2]}, Feature Vector Shape: {listing[3].shape}")


import psycopg2
import numpy as np
from similarity import find_most_similar_text
from feature_extraction import extract_features,extract_text_features
import json


# Database connection details
connection = psycopg2.connect(
    host="localhost",
    database="Unilease",
    user="Nihar",
    password="Unilease"
)

cursor = connection.cursor()

def load_all_listings():
    # Query to get all listing features
    cursor.execute("SELECT id, name, file_path, features FROM listings")
    listings = cursor.fetchall()
    
    results = []
    for listing in listings:
        listing_id, name, file_path, features_blob = listing
        # Convert the byte data back to a numpy array
        features_array = np.frombuffer(features_blob, dtype=np.float32)
        results.append((listing_id, name, file_path, features_array))
    
    return results

listings = load_all_listings()

print("Retrieved listings:")
for listing in listings:
    print(f"ID: {listing[0]}, Name: {listing[1]}, Address: {listing[2]}, Feature Vector Shape: {listing[3].shape}")


# def get_similar_properties_by_text(user_text):
#     conn = psycopg2.connect(database="Unilease", user="Nihar", password="Unilease")
#     cursor = conn.cursor()
    
#     # Retrieve all text features from the database
#     cursor.execute("SELECT id, name, text_features FROM Properties")
#     listings = cursor.fetchall()
    
#     # Convert user text to features and find similar properties
#     user_text_features = extract_text_features(user_text)
#     similar_listings = find_most_similar_text(user_text_features, listings)

#     conn.close()
#     return similar_listings

def get_similar_properties_by_text(user_text):
    # Connect to your database
    conn = psycopg2.connect(database="Unilease", user="Nihar", password="Unilease")
    cursor = conn.cursor()
    
    # Retrieve all text features from the database
    cursor.execute("SELECT id, name, text_features FROM Properties")
    listings = cursor.fetchall()
    
    # Prepare listings data
    formatted_listings = []
    for listing_id, name, text_features in listings:
        # Directly convert the list to a numpy array, as it's already in list form
        text_features_array = np.array(text_features)
        formatted_listings.append((listing_id, name, text_features_array))

    # Convert user text to features
    user_text_features = extract_text_features(user_text)

    # Find the most similar properties
    similar_listings = find_most_similar_text(user_text_features, formatted_listings)

    # Close the database connection
    conn.close()
    return similar_listings

if __name__ == "__main__":
    user_text = "Looking for a brown villa with two bedrooms close to downtown"
    similar_listings = get_similar_properties_by_text(user_text)
    
    print("Most similar listings based on text input:")
    for listing_id, name, score in similar_listings:
        print(f"ID: {listing_id}, Name: {name}, Similarity Score: {score:.4f}")
    