from flask import Flask, jsonify, render_template, request
import pickle
import numpy as np

model = pickle.load(open('model.pkl', 'rb'))

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/', methods=['GET', 'POST'])
def predict():
    symptom_dictionary = {
        'symptom_index': {'Itching': 0, 'Skin Rash': 1, 'Nodal Skin Eruptions': 2, 'Continuous Sneezing': 3,
                          'Shivering': 4, 'Chills': 5, 'Joint Pain': 6, 'Stomach Pain': 7, 'Acidity': 8,
                          'Ulcers On Tongue': 9, 'Muscle Wasting': 10, 'Vomiting': 11,
                          'Burning Micturition': 12, 'Spotting  urination': 13, 'Fatigue': 14,
                          'Weight Gain': 15, 'Anxiety': 16, 'Cold Hands And Feets': 17, 'Mood Swings': 18,
                          'Weight Loss': 19, 'Restlessness': 20, 'Lethargy': 21, 'Patches In Throat': 22,
                          'Irregular Sugar Level': 23, 'Cough': 24, 'High Fever': 25, 'Sunken Eyes': 26,
                          'Breathlessness': 27, 'Sweating': 28, 'Dehydration': 29, 'Indigestion': 30,
                          'Headache': 31, 'Yellowish Skin': 32, 'Dark Urine': 33, 'Nausea': 34,
                          'Loss Of Appetite': 35, 'Pain Behind The Eyes': 36, 'Back Pain': 37,
                          'Constipation': 38, 'Abdominal Pain': 39, 'Diarrhoea': 40, 'Mild Fever': 41,
                          'Yellow Urine': 42, 'Yellowing Of Eyes': 43, 'Acute Liver Failure': 44,
                          'Fluid Overload': 45, 'Swelling Of Stomach': 46, 'Swelled Lymph Nodes': 47,
                          'Malaise': 48, 'Blurred And Distorted Vision': 49, 'Phlegm': 50,
                          'Throat Irritation': 51, 'Redness Of Eyes': 52, 'Sinus Pressure': 53,
                          'Runny Nose': 54, 'Congestion': 55, 'Chest Pain': 56, 'Weakness In Limbs': 57,
                          'Fast Heart Rate': 58, 'Pain During Bowel Movements': 59, 'Pain In Anal Region': 60,
                          'Bloody Stool': 61, 'Irritation In Anus': 62, 'Neck Pain': 63, 'Dizziness': 64,
                          'Cramps': 65, 'Bruising': 66, 'Obesity': 67, 'Swollen Legs': 68,
                          'Swollen Blood Vessels': 69, 'Puffy Face And Eyes': 70, 'Enlarged Thyroid': 71,
                          'Brittle Nails': 72, 'Swollen Extremeties': 73, 'Excessive Hunger': 74,
                          'Extra Marital Contacts': 75, 'Drying And Tingling Lips': 76, 'Slurred Speech': 77,
                          'Knee Pain': 78, 'Hip Joint Pain': 79, 'Muscle Weakness': 80, 'Stiff Neck': 81,
                          'Swelling Joints': 82, 'Movement Stiffness': 83, 'Spinning Movements': 84,
                          'Loss Of Balance': 85, 'Unsteadiness': 86, 'Weakness Of One Body Side': 87,
                          'Loss Of Smell': 88, 'Bladder Discomfort': 89, 'Foul Smell Of urine': 90,
                          'Continuous Feel Of Urine': 91, 'Passage Of Gases': 92, 'Internal Itching': 93,
                          'Toxic Look (typhos)': 94, 'Depression': 95, 'Irritability': 96, 'Muscle Pain': 97,
                          'Altered Sensorium': 98, 'Red Spots Over Body': 99, 'Belly Pain': 100,
                          'Abnormal Menstruation': 101, 'Dischromic  Patches': 102, 'Watering From Eyes': 103,
                          'Increased Appetite': 104, 'Polyuria': 105, 'Family History': 106,
                          'Mucoid Sputum': 107, 'Rusty Sputum': 108, 'Lack Of Concentration': 109,
                          'Visual Disturbances': 110, 'Receiving Blood Transfusion': 111,
                          'Receiving Unsterile Injections': 112, 'Coma': 113, 'Stomach Bleeding': 114,
                          'Distention Of Abdomen': 115, 'History Of Alcohol Consumption': 116,
                          'Fluid Overload.1': 117, 'Blood In Sputum': 118, 'Prominent Veins On Calf': 119,
                          'Palpitations': 120, 'Painful Walking': 121, 'Pus Filled Pimples': 122,
                          'Blackheads': 123, 'Scurring': 124, 'Skin Peeling': 125, 'Silver Like Dusting': 126,
                          'Small Dents In Nails': 127, 'Inflammatory Nails': 128, 'Blister': 129,
                          'Red Sore Around Nose': 130, 'Yellow Crust Ooze': 131},
        'predictions_classes': ['(vertigo) Paroymsal  Positional Vertigo', 'AIDS', 'Acne',
                                'Alcoholic hepatitis', 'Allergy', 'Arthritis', 'Bronchial Asthma',
                                'Cervical spondylosis', 'Chicken pox', 'Chronic cholestasis',
                                'Common Cold', 'Dengue', 'Diabetes ',
                                'Dimorphic hemmorhoids(piles)', 'Drug Reaction',
                                'Fungal infection', 'GERD', 'Gastroenteritis', 'Heart attack',
                                'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E',
                                'Hypertension ', 'Hyperthyroidism', 'Hypoglycemia',
                                'Hypothyroidism', 'Impetigo', 'Jaundice', 'Malaria', 'Migraine',
                                'Osteoarthristis', 'Paralysis (brain hemorrhage)',
                                'Peptic ulcer diseae', 'Pneumonia', 'Psoriasis', 'Tuberculosis',
                                'Typhoid', 'Urinary tract infection', 'Varicose veins',
                                'hepatitis A']}
    disease_dictionary = {
        'Drug Reaction': 'An adverse drug reaction (ADR) is an injury caused by taking medication. ADRs may occur following a single dose or prolonged administration of a drug or result from the combination of two or more drugs.',
        'Malaria': 'An infectious disease caused by protozoan parasites from the Plasmodium family that can be transmitted by the bite of the Anopheles mosquito or by a contaminated needle or transfusion. Falciparum malaria is the most deadly type.',
        'Allergy': "An allergy is an immune system response to a foreign substance that's not typically harmful to your body.They can include certain foods, pollen, or pet dander. Your immune system's job is to keep you healthy by fighting harmful pathogens.",
        'Hypothyroidism': 'Hypothyroidism, also called underactive thyroid or low thyroid, is a disorder of the endocrine system in which the thyroid gland does not produce enough thyroid hormone.',
        'Psoriasis': "Psoriasis is a common skin disorder that forms thick, red, bumpy patches covered with silvery scales. They can pop up anywhere, but most appear on the scalp, elbows, knees, and lower back. Psoriasis can't be passed from person to person. It does sometimes happen in members of the same family.",
        'GERD': 'Gastroesophageal reflux disease, or GERD, is a digestive disorder that affects the lower esophageal sphincter (LES), the ring of muscle between the esophagus and stomach. Many people, including pregnant women, suffer from heartburn or acid indigestion caused by GERD.',
        'Chronic cholestasis': 'Chronic cholestatic diseases, whether occurring in infancy, childhood or adulthood, are characterized by defective bile acid transport from the liver to the intestine, which is caused by primary damage to the biliary epithelium in most cases',
        'hepatitis A': "Hepatitis A is a highly contagious liver infection caused by the hepatitis A virus. The virus is one of several types of hepatitis viruses that cause inflammation and affect your liver's ability to function.",
        'Osteoarthristis': 'Osteoarthritis is the most common form of arthritis, affecting millions of people worldwide. It occurs when the protective cartilage that cushions the ends of your bones wears down over time.',
        '(vertigo) Paroymsal  Positional Vertigo': "Benign paroxysmal positional vertigo (BPPV) is one of the most common causes of vertigo — the sudden sensation that you're spinning or that the inside of your head is spinning. Benign paroxysmal positional vertigo causes brief episodes of mild to intense dizziness.",
        'Hypoglycemia': " Hypoglycemia is a condition in which your blood sugar (glucose) level is lower than normal. Glucose is your body's main energy source. Hypoglycemia is often related to diabetes treatment. But other drugs and a variety of conditions — many rare — can cause low blood sugar in people who don't have diabetes.",
        'Acne': 'Acne vulgaris is the formation of comedones, papules, pustules, nodules, and/or cysts as a result of obstruction and inflammation of pilosebaceous units (hair follicles and their accompanying sebaceous gland). Acne develops on the face and upper trunk. It most often affects adolescents.',
        'Diabetes': 'Diabetes is a disease that occurs when your blood glucose, also called blood sugar, is too high. Blood glucose is your main source of energy and comes from the food you eat. Insulin, a hormone made by the pancreas, helps glucose from food get into your cells to be used for energy.',
        'Impetigo': "Impetigo (im-puh-TIE-go) is a common and highly contagious skin infection that mainly affects infants and children. Impetigo usually appears as red sores on the face, especially around a child's nose and mouth, and on hands and feet. The sores burst and develop honey-colored crusts.",
        'Hypertension': 'Hypertension (HTN or HT), also known as high blood pressure (HBP), is a long-term medical condition in which the blood pressure in the arteries is persistently elevated. High blood pressure typically does not cause symptoms.',
        'Peptic ulcer diseae': 'Peptic ulcer disease (PUD) is a break in the inner lining of the stomach, the first part of the small intestine, or sometimes the lower esophagus. An ulcer in the stomach is called a gastric ulcer, while one in the first part of the intestines is a duodenal ulcer.',
        'Dimorphic hemorrhoids(piles)': 'Hemorrhoids, also spelled haemorrhoids, are vascular structures in the anal canal. In their ... Other names, Haemorrhoids, piles, hemorrhoidal disease .',
        'Common Cold': "The common cold is a viral infection of your nose and throat (upper respiratory tract). It's usually harmless, although it might not feel that way. Many types of viruses can cause a common cold.",
        'Chicken pox': 'Chickenpox is a highly contagious disease caused by the varicella-zoster virus (VZV). It can cause an itchy, blister-like rash. The rash first appears on the chest, back, and face, and then spreads over the entire body, causing between 250 and 500 itchy blisters.',
        'Cervical spondylosis': 'Cervical spondylosis is a general term for age-related wear and tear affecting the spinal disks in your neck. As the disks dehydrate and shrink, signs of osteoarthritis develop, including bony projections along the edges of bones (bone spurs).',
        'Hyperthyroidism': "Hyperthyroidism (overactive thyroid) occurs when your thyroid gland produces too much of the hormone thyroxine. Hyperthyroidism can accelerate your body's metabolism, causing unintentional weight loss and a rapid or irregular heartbeat.",
        'Urinary tract infection': 'Urinary tract infection: An infection of the kidney, ureter, bladder, or urethra. Abbreviated UTI. Not everyone with a UTI has symptoms, but common symptoms include a frequent urge to urinate and pain or burning when urinating.',
        'Varicose veins': 'A vein that has enlarged and twisted, often appearing as a bulging, blue blood vessel that is clearly visible through the skin. Varicose veins are most common in older adults, particularly women, and occur especially on the legs.',
        'AIDS': "Acquired immunodeficiency syndrome (AIDS) is a chronic, potentially life-threatening condition caused by the human immunodeficiency virus (HIV). By damaging your immune system, HIV interferes with your body's ability to fight infection and disease.",
        'Paralysis (brain hemorrhage)': 'Intracerebral hemorrhage (ICH) is when blood suddenly bursts into brain tissue, causing damage to your brain. Symptoms usually appear suddenly during ICH. They include headache, weakness, confusion, and paralysis, particularly on one side of your body.',
        'Typhoid': 'An acute illness characterized by fever caused by infection with the bacterium Salmonella typhi. Typhoid fever has an insidious onset, with fever, headache, constipation, malaise, chills, and muscle pain. Diarrhea is uncommon, and vomiting is not usually severe.',
        'Hepatitis B': "Hepatitis B is an infection of your liver. It can cause scarring of the organ, liver failure, and cancer. It can be fatal if it isn't treated. It's spread when people come in contact with the blood, open sores, or body fluids of someone who has the hepatitis B virus.",
        'Fungal infection': 'In humans, fungal infections occur when an invading fungus takes over an area of the body and is too much for the immune system to handle. Fungi can live in the air, soil, water, and plants. There are also some fungi that live naturally in the human body. Like many microbes, there are helpful fungi and harmful fungi.',
        'Hepatitis C': 'Inflammation of the liver due to the hepatitis C virus (HCV), which is usually spread via blood transfusion (rare), hemodialysis, and needle sticks. The damage hepatitis C does to the liver can lead to cirrhosis and its complications as well as cancer.',
        'Migraine': "A migraine can cause severe throbbing pain or a pulsing sensation, usually on one side of the head. It's often accompanied by nausea, vomiting, and extreme sensitivity to light and sound. Migraine attacks can last for hours to days, and the pain can be so severe that it interferes with your daily activities.",
        'Bronchial Asthma': 'Bronchial asthma is a medical condition which causes the airway path of the lungs to swell and narrow. Due to this swelling, the air path produces excess mucus making it hard to breathe, which results in coughing, short breath, and wheezing. The disease is chronic and interferes with daily working.',
        'Alcoholic hepatitis': "Alcoholic hepatitis is a diseased, inflammatory condition of the liver caused by heavy alcohol consumption over an extended period of time. It's also aggravated by binge drinking and ongoing alcohol use. If you develop this condition, you must stop drinking alcohol",
        'Jaundice': 'Yellow staining of the skin and sclerae (the whites of the eyes) by abnormally high blood levels of the bile pigment bilirubin. The yellowing extends to other tissues and body fluids. Jaundice was once called the "morbus regius" (the regal disease) in the belief that only the touch of a king could cure it',
        'Hepatitis E': 'A rare form of liver inflammation caused by infection with the hepatitis E virus (HEV). It is transmitted via food or drink handled by an infected person or through infected water supplies in areas where fecal matter may get into the water. Hepatitis E does not cause chronic liver disease.',
        'Dengue': 'an acute infectious disease caused by a flavivirus (species Dengue virus of the genus Flavivirus), transmitted by aedes mosquitoes, and characterized by headache, severe joint pain, and a rash. — called also breakbone fever, dengue fever.',
        'Hepatitis D': 'Hepatitis D, also known as the hepatitis delta virus, is an infection that causes the liver to become inflamed. This swelling can impair liver function and cause long-term liver problems, including liver scarring and cancer. The condition is caused by the hepatitis D virus (HDV).',
        'Heart attack': 'The death of heart muscle due to the loss of blood supply. The loss of blood supply is usually caused by a complete blockage of a coronary artery, one of the arteries that supplies blood to the heart muscle.',
        'Pneumonia': 'Pneumonia is an infection in one or both lungs. Bacteria, viruses, and fungi cause it. The infection causes inflammation in the air sacs in your lungs, which are called alveoli. The alveoli fill with fluid or pus, making it difficult to breathe.',
        'Arthritis': 'Arthritis is the swelling and tenderness of one or more of your joints. The main symptoms of arthritis are joint pain and stiffness, which typically worsen with age. The most common types of arthritis are osteoarthritis and rheumatoid arthritis.',
        'Gastroenteritis': 'Gastroenteritis is an inflammation of the digestive tract, particularly the stomach, and large and small intestines. Viral and bacterial gastroenteritis are intestinal infections associated with symptoms of diarrhea , abdominal cramps, nausea , and vomiting .',
        'Tuberculosis': 'Tuberculosis (TB) is an infectious disease usually caused by Mycobacterium tuberculosis (MTB) bacteria. Tuberculosis generally affects the lungs, but can also affect other parts of the body. Most infections show no symptoms, in which case it is known as latent tuberculosis.'}

    if request.method == 'POST':
        symptoms = request.form.get('input_symptoms')
        symptoms = symptoms.split(",")

        # creating input data for the models
        input_data = [0] * len(symptom_dictionary["symptom_index"])
        for symptom in symptoms:
            index = symptom_dictionary["symptom_index"][symptom]
            input_data[index] = 1

        # reshape input_data to numpy array
        input_data = np.array(input_data).reshape(1, -1)

        # generating individual outputs
        prediction = symptom_dictionary["predictions_classes"][model.predict(input_data)[0]]
        explanation = disease_dictionary[prediction]
        print(prediction)
        print(explanation)
        print(jsonify({'prediction': prediction, 'explanation': explanation}))
        if prediction and explanation:
            return jsonify({'prediction': prediction, 'explanation': explanation})
        return jsonify({'error': 'Missing data!'})
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)
