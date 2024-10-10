import random

from flask import Flask, request, jsonify

app = Flask(__name__)

# Juhusliku numbri genereerimine vahemikus 1-10
arvuti_number = random.randint(1, 10)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/kontrolli_arvamus', methods=['POST'])
def kontrolli_arvamus():
    global arvuti_number
    kasutaja_arvamus = int(request.json['arvamus'])

    # Kontrollime, kas kasutaja arvamus on suurem, väiksem või võrdne
    if kasutaja_arvamus < arvuti_number:
        sonum = "Suurem"
    elif kasutaja_arvamus > arvuti_number:
        sonum = "Väiksem"
    else:
        sonum = "Õige! Arvuti valis numbri " + str(arvuti_number) + ". Uus number on genereeritud!"
        # Genereeri uus number pärast õiget arvamist
        arvuti_number = random.randint(1, 10)

    return jsonify(sonum=sonum)


if __name__ == '__main__':
    app.run(debug=True)
