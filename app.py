from flask import Flask, render_template, request, jsonify, redirect, url_for
from jinja2 import Undefined
from pymongo import MongoClient
from datetime import datetime, timedelta

import requests
import json
import xmltodict, json
import urllib

import jwt
import hashlib
import certifi
from werkzeug.utils import secure_filename

ca = certifi.where()

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['UPLOAD_FOLDER'] = "./static/profile_pics"

SECRET_KEY = 'SPARTA'
MONGO_CLIENT_URL = 'mongodb+srv://test:sparta@cluster0.plrlvlp.mongodb.net/?retryWrites=true&w=majority'

# user가 저장된 db
client = MongoClient(MONGO_CLIENT_URL)
db = client.spart_week1

# 리뷰가 저장된 db
review_client = MongoClient(MONGO_CLIENT_URL)
review_db = review_client.spart_week1


# 메인페이지
@app.route('/')
def main():
    return render_template("index.html")

@app.route("/review_test", methods=["GET"])
def main_get():
    book_list = list(review_db.review_test.find({}, {'_id': False}))
    return jsonify({'books': book_list})

# 상세페이지
@app.route('/detail')
def detail():
    return render_template("detail.html")

@app.route('/detail/reviewData', methods=["GET"])
def detail_data():
    book_data = list(review_db.review_test.find({}, {'_id': False}))
    return jsonify({'bookData': book_data})

@app.route('/detail/<num>')
def detail_bookdata(num):

    book_list = list(review_db.review_test.find({"content_no": int(num)}, {'_id': False}))

    book_title = book_list[0]['title']
    book_content = book_list[0]['content']
    book_imageurl = book_list[0]['file']
    book_nick = book_list[0]['writer_nickname']
    book_time = book_list[0]['time']
    book_score = book_list[0]['star_score']
    isbn = book_list[0]['isbn']
    category = book_list[0]['category']


    return render_template("detail.html", book_title=book_title, book_content=book_content, book_imageurl=book_imageurl,
                           book_time=book_time, book_num=num, book_score=book_score, book_nick=book_nick, isbn=isbn, category=category)

# 작성페이지
@app.route('/edit-page')
def edit_page():
    
    token_receive = request.cookies.get('mytoken')
    # payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    # nickname = payload['nickname']

    return render_template("edit-page.html")
                            # , nickname=nickname)

# 수정페이지
@app.route('/edit/<reviewNo>')
def edit_review(reviewNo):
    
    book_list = list(review_db.review_test.find({"content_no": int(reviewNo)}, {'_id': False}))

    title = book_list[0]['title']
    content = book_list[0]['content']
    image_url = book_list[0]['file']
    star_score = book_list[0]['star_score']
    category = book_list[0]['category']

    return render_template("edit-page.html", title=title, content=content, image=image_url, review_no=reviewNo,
                           isEdit=title, star_score=star_score, category=category)


# 네이버를 통해 검색된 책의 정보들을 반환
@app.route('/detail/<isbn>', methods=['POST'])
def find_bookdetail_from_naver(isbn):

    header_info = {"X-Naver-Client-Id": "0g0WhKXaBnkuD7TS7sEC", "X-Naver-Client-Secret": "EV_4uF2dqi"}
    r = requests.get('https://openapi.naver.com/v1/search/book_adv.xml?d_isbn=' + str(isbn), headers=header_info)

    o = xmltodict.parse(r.text)
    result = json.dumps(o, ensure_ascii=False)
    data = json.loads(result)['rss']['channel']['item']

    return jsonify(data)


# 네이버를 통해 검색된 책자의 리뷰를 작성
@app.route('/edit-page/<isbn>')
def find_bookdetail_via_isbn(isbn):
    # /api/call-bookinfo URL로 POST 방식으로 도착한 데이터
    header_info = {"X-Naver-Client-Id": "0g0WhKXaBnkuD7TS7sEC", "X-Naver-Client-Secret": "EV_4uF2dqi"}
    r = requests.get('https://openapi.naver.com/v1/search/book_adv.xml?d_isbn=' + str(isbn), headers=header_info)

    o = xmltodict.parse(r.text)
    result = json.dumps(o, ensure_ascii=False)
    data = json.loads(result)

    title = data['rss']['channel']['item']['title']
    image_url = data['rss']['channel']['item']['image']
    author = data['rss']['channel']['item']['author']
    description = data['rss']['channel']['item']['description']
    pubdate = data['rss']['channel']['item']['pubdate']
    publisher = data['rss']['channel']['item']['publisher']
    

    return render_template("edit-page.html", title=title, image=image_url, author=author, description=description, isbn=isbn, pubdate=pubdate, publisher=publisher)


# 작성된 리뷰를 저장
@app.route('/save-review', methods=['POST'])
def save_review():
    
    all_reviews = list(review_db.review_test.find({}, {'_id': False}))
    
    review_count = all_reviews[-1]['content_no'] + 1

    booktitle = request.form['booktitle_give']
    review_content = request.form['review_content_give']
    img_url = request.form['imgfile_give']
    writer_nickname = request.form['writer_nickname']
    isbn = request.form['isbn']
    category = request.form['category']
    star_score = int(request.form['star_score'])

    doc = {
        'title': booktitle,
        'content': review_content,
        'file': img_url,
        'time': datetime.now().strftime('%Y.%m.%d.%H:%M:%S'),
        'writer_nickname': writer_nickname,
        'star_score': star_score,
        'content_no': review_count,
        'isbn' : isbn,
        'category' : category 
    }

    review_db.review_test.insert_one(doc)

    return render_template("index.html")


# 수정된 리뷰를 저장
@app.route('/update-review', methods=['POST'])
def update_review():
    booktitle = request.form['booktitle_give']
    review_content = request.form['review_content_give']
    content_no = int(request.form['edited_content_no'])
    star_score = int(request.form['star_score'])
    category = request.form['category']


    doc = {
        'title': booktitle,
        'content': review_content,
        'star_score': star_score,
        'category' : category 
    }

    review_db.review_test.update_one({'content_no': content_no}, {'$set': doc})

    return render_template("index.html")


# 리뷰 삭제
@app.route('/delete/<reviewNo>', methods=['POST'])
def delete_review(reviewNo):
    
    review_db.review_test.delete_one({'content_no': int(reviewNo)})

    return jsonify({'message': '삭제가 완료되었습니다.'})


# naverapi에서 검색어 정보를 불러오는 코드
@app.route('/api/call-bookinfo', methods=['POST'])
def give_bookInfo():
    data = urllib.parse.unquote(request.data)
    print(data)

    # /api/call-bookinfo URL로 POST 방식으로 도착한 데이터
    header_info = {"X-Naver-Client-Id": "0g0WhKXaBnkuD7TS7sEC", "X-Naver-Client-Secret": "EV_4uF2dqi"}
    r = requests.get('https://openapi.naver.com/v1/search/book.json?' + data, headers=header_info)
    result = r.json()

    return result


# 로그인
@app.route('/login/sign_in', methods=['POST'])
def sign_in():
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']
    pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    
    # 해당하는 값 찾아보기 
    result = db.users.find_one({'username': username_receive, 'password': pw_hash})
    
    # 찾으면,
    if result is not None:
        
        # payload를 만들어 정보를 담고,
        payload = {
            'id': result['username'],
            'nickname': result['nickname'],
            'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)  # 로그인 24시간 유지
        }
        
        # 토큰에 담아 쿠키에 전달
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token, 'id': payload["id"], 'nickname': payload["nickname"]})
    
    # 못찾으면, 
    else:

        return jsonify({'result': 'fail', 'msg': '아이디 또는 비밀번호가 일치하지 않습니다.'})
    

# 회원가입 명령
@app.route('/register/sign_up', methods=['POST'])
def sign_up():

    doc = {
        "username": request.form['username_give'],  # 아이디
        "password": hashlib.sha256(request.form['password_give'].encode('utf-8')).hexdigest(),  # 비밀번호
        "nickname": request.form['nickname_give'],
        "profile_name": request.form['username_give'],  # 프로필 이름 기본값은 아이디
    }
    
    db.users.insert_one(doc)
    
    return jsonify({'result': 'success'})


# 기존에 있는 아이디인지 확인
@app.route('/register/check_dup', methods=['POST'])
def check_dup():
    username_receive = request.form['username_give']
    exists = bool(db.users.find_one({"username": username_receive}))
    return jsonify({'result': 'success', 'exists': exists})


# 기존에 있는 아이디인지 확인 
@app.route('/register/check_nickname', methods=['POST'])
def check_nickname():
    nickname_tocheck = request.form['nickname_tocheck']
    exists = bool(db.users.find_one({"nickname": nickname_tocheck}))
    
    print(exists)
    
    return jsonify({'result': 'success', 'exists': exists})


# 토큰을 전달받아 로그인 된 것이 맞는지 다시 한번 확인해서 이용자 정보를 반환하는 서버
@app.route('/check-login')
def checkLogin():
    
    token_receive = request.cookies.get('mytoken')
    
    try:
        
        # 받은 토큰을 디코드해서 DB에서 정보를 찾아내어 반환 
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"username": payload["id"]}, {'_id': 0 })
        print(user_info)
        return jsonify(user_info)
    
    except jwt.ExpiredSignatureError:
        
        return jsonify({"msg": "로그인 시간이 만료되었습니다."})
    
    except jwt.exceptions.DecodeError:
        
        return jsonify({"msg": "로그인 정보가 존재하지 않습니다."})
    



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)


