class BinsController < ApplicationController
  before_action :set_bin, only: [:show, :edit, :update, :destroy]
  before_action :set_options, only: [:new, :edit]

  def show
  end

  def new
    @bin = Bin.new
  end

  def create
    @bin = Bin.new(bin_params)
    @bin.save
    respond_to do |format|
      format.html do
        redirect_to bin_path(@bin.slug)
      end
      format.js
    end
  end

  def edit
    @options[:url] = bin_path(identifier: @bin.slug)
  end

  def update
    @bin.update(bin_params)
    respond_to do |format|
      format.html do
        redirect_to bin_path(@bin.slug)
      end
      format.js
    end
  end

  def destroy
    @bin.destroy
  end


  private

  def bin_params
    params.require(:bin).permit(:content)
  end

  def set_bin
    @bin = Bin.find_by_slug(params[:slug])
  end

  def set_options
    @options = {
      html: {
        id: :theBin
      },
      remote: true
    }
  end

end