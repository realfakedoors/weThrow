# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_12_100403) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "courses", force: :cascade do |t|
    t.bigint "curator_id", null: false
    t.string "name"
    t.text "description"
    t.text "current_conditions", default: "Unknown"
    t.string "public_availability"
    t.string "seasonality"
    t.decimal "lat"
    t.decimal "lng"
    t.string "address"
    t.string "city"
    t.string "state"
    t.integer "zip"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "course_designer"
    t.string "teepads"
    t.text "baskets"
    t.integer "established"
    t.string "pet_policy"
    t.boolean "public_restrooms"
    t.boolean "cart_friendly"
    t.boolean "free_parking"
    t.boolean "camping"
    t.boolean "dedicated_property"
    t.string "curator_name"
    t.float "avg_rating"
    t.index ["curator_id"], name: "index_courses_on_curator_id"
  end

  create_table "direct_messages", force: :cascade do |t|
    t.string "category"
    t.bigint "sender_id", null: false
    t.bigint "recipient_id", null: false
    t.string "subject"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recipient_id"], name: "index_direct_messages_on_recipient_id"
    t.index ["sender_id"], name: "index_direct_messages_on_sender_id"
  end

  create_table "hole_layouts", force: :cascade do |t|
    t.bigint "course_id"
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_hole_layouts_on_course_id"
  end

  create_table "holes", force: :cascade do |t|
    t.bigint "hole_layout_id"
    t.string "name", null: false
    t.integer "par", null: false
    t.integer "distance"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["hole_layout_id"], name: "index_holes_on_hole_layout_id"
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "messages", force: :cascade do |t|
    t.string "content"
    t.bigint "author_id", null: false
    t.string "messageable_type"
    t.bigint "messageable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "read_by", default: [], array: true
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["messageable_type", "messageable_id"], name: "index_messages_on_messageable"
    t.index ["read_by"], name: "index_messages_on_read_by"
  end

  create_table "photos", force: :cascade do |t|
    t.string "url"
    t.bigint "uploader_id", null: false
    t.string "photo_attachable_type"
    t.bigint "photo_attachable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["photo_attachable_type", "photo_attachable_id"], name: "index_photos_on_photo_attachable"
    t.index ["uploader_id"], name: "index_photos_on_uploader_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.bigint "user_id", null: false
    t.float "rating"
    t.text "assessment"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "user_name"
    t.string "user_profile_picture"
    t.index ["course_id"], name: "index_reviews_on_course_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "admin", default: false
    t.string "name", default: "", null: false
    t.string "username"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "courses", "users", column: "curator_id"
  add_foreign_key "direct_messages", "users", column: "recipient_id"
  add_foreign_key "direct_messages", "users", column: "sender_id"
  add_foreign_key "hole_layouts", "courses"
  add_foreign_key "holes", "hole_layouts"
  add_foreign_key "messages", "users", column: "author_id"
  add_foreign_key "photos", "users", column: "uploader_id"
  add_foreign_key "reviews", "courses"
  add_foreign_key "reviews", "users"
end
